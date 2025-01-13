<pre>
<code>
DELIMITER $$

CREATE EVENT EVENT_delete_old_orders
ON SCHEDULE EVERY 10 MINUTE
DO
BEGIN
    -- Cập nhật lại trạng thái xe nếu không thực hiện thuê xe (dành cho thanh toán online)
    UPDATE xes
    INNER JOIN chi_tiet_thue_xes AS cttx ON xes.ma_xe = cttx.ma_xe
    INNER JOIN thue_xes AS tx ON tx.ma_don_dat = cttx.ma_don_dat
    SET xes.co_san = (SELECT COUNT(*) FROM bien_so_xes bsx WHERE bsx.ma_xe = xes.ma_xe)
    WHERE tx.ma_tinh_trang = 0 AND TIMESTAMPDIFF(MINUTE, tx.createdAt, NOW()) >= 10;

    -- Xóa các đơn hàng cũ chưa được hoàn tất
    DELETE FROM thue_xes
    WHERE ma_tinh_trang = 0 
      AND TIMESTAMPDIFF(MINUTE, createdAt, NOW()) >= 10;
END$$

DELIMITER ;

-- ---------------------------------------------------------------------------------------------

DELIMITER $$

CREATE PROCEDURE load_bike_status()
BEGIN
    DECLARE total INT; -- tổng số xe
    DECLARE dang_thue INT; -- tổng số xe đang được cho thuê
    DECLARE unabled INT; -- tổng số xe đang không cho lên sàn thuê
    DECLARE con_lai INT; -- số xe cho thuê còn lại trong kho

    -- Tính tổng số xe tồn kho (số xe còn lại)
    SELECT COALESCE(SUM(xes.co_san)) INTO con_lai FROM xes;
    -- Tính tổng xe có trong hệ thống
    SELECT COUNT(*) INTO total FROM bien_so_xes;
    -- Tính số xe đang không hoạt động
    SELECT COUNT(*) INTO unabled FROM bien_so_xes WHERE bien_so_xes.tinh_trang = 0;
    -- Tính số xe đang cho thuê (= tổng số xe - phần còn trong kho)
    SET dang_thue = total - con_lai;

    -- Xuất kết quả: tổng số xe và số lượng xe đã cho thuê
    SELECT total, dang_thue AS rented, con_lai AS stock, unabled;
END$$

DELIMITER ;

-- -----------------------------------------------------------------------------------

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAndUpdateBienSoXe`(IN `bien_sos` JSON)
BEGIN
    DECLARE errorMessage VARCHAR(255);
    
    -- Kiểm tra nếu có sản phẩm nào đang trong trạng thái "đang thuê"
    IF EXISTS (
        SELECT 1
        FROM bien_so_xes
        WHERE bien_so IN (
            SELECT CAST(bien_xe_json.value AS CHAR) 
            FROM JSON_TABLE(bien_sos, '$[*]' COLUMNS(value VARCHAR(255) PATH '$')) AS bien_xe_json
        )
        AND dang_thue = 1
    ) THEN
        SET errorMessage = 'Có sản phẩm đang trong trạng thái "đang thuê".';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = errorMessage;
    END IF;
    -- Lấy danh sách sản phẩm
    SELECT bien_so AS bien_so
    FROM bien_so_xes
    WHERE bien_so IN (
        SELECT CAST(bien_xe_json.value AS CHAR)  -- Sử dụng CHAR thay vì VARCHAR(15)
        FROM JSON_TABLE(bien_sos, '$[*]' COLUMNS(value VARCHAR(255) PATH '$')) AS bien_xe_json
    );

    -- Cập nhật trạng thái của các sản phẩm được chọn thành "đang thuê"
    UPDATE bien_so_xes
    SET dang_thue = 1
    WHERE bien_so IN (
        SELECT CAST(bien_xe_json.value AS CHAR)  -- Sử dụng CHAR thay vì VARCHAR(15)
        FROM JSON_TABLE(bien_sos, '$[*]' COLUMNS(value VARCHAR(255) PATH '$')) AS bien_xe_json
    );
END$$
DELIMITER ;
-- ---------------------------------------------------------------------------------

CREATE VIEW v_order_detail AS
select `cttx`.`ma_don_dat` AS `ma_don_dat`,`cttx`.`ma_xe` AS `ma_xe`,`cttx`.`gia_tien` AS `gia_tien`,`cttx`.`so_luong` AS `so_luong`,`cttx`.`the_chan` AS `the_chan`,`qlthuexe`.`xes`.`ten_xe` AS `ten_xe`,`qlthuexe`.`hinh_anhs`.`url` AS `url`,`qlthuexe`.`hinh_anhs`.`publicId` AS `publicId` from ((`qlthuexe`.`chi_tiet_thue_xes` `cttx` join `qlthuexe`.`xes` on((`qlthuexe`.`xes`.`ma_xe` = `cttx`.`ma_xe`))) join `qlthuexe`.`hinh_anhs` on((`qlthuexe`.`xes`.`ma_xe` = `qlthuexe`.`hinh_anhs`.`ma_xe`)))

-- ------------------------------------------------------------------------------------
DELIMITER $$
CREATE TRIGGER `CHECK_STATUS_ORDER_BEFORE_CHANGE` BEFORE UPDATE ON `thue_xes`
 FOR EACH ROW BEGIN
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
	IF OLD.ma_tinh_trang > NEW.ma_tinh_trang THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Cannot update';
END IF;
END$$
DELIMITER ;
-- -------------------------------------------------------------------------------
DELIMITER $$
CREATE TRIGGER TRIG_CHECK_DELETE_BIEN_SO_XE
BEFORE DELETE ON bien_so_xes
FOR EACH ROW
BEGIN
    if EXISTS(SELECT 1 FROM ct_giao_xes ct JOIN bien_so_xes bsx ON bsx.bien_so = ct.bien_so
              WHERE ct.bien_so = OLD.bien_so) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Không thể xóa vì có đơn thuê';
    END IF;
END$$

DELIMITER //
-- -----------------------------------------------------------------------
DELIMITER $$

CREATE TRIGGER TRIG_CHECK_DELETE_XE
BEFORE DELETE ON xes
FOR EACH ROW
BEGIN
    if EXISTS(SELECT 1 FROM xes xes JOIN chi_tiet_thue_xes ct ON xes.ma_xe = ct.ma_xe  WHERE xes.ma_xe = OLD.ma_xe) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Không thể xóa vì đang có đơn thuê';
    END IF;
END$$

DELIMITER //
-- ----------------------------------------------------------------
DELIMITER $$

CREATE TRIGGER DELETE_LOAI_XE
BEFORE DELETE ON loai_xes
FOR EACH ROW
BEGIN
	IF EXISTS( SELECT 1 FROM xes WHERE xes.ma_loai = OLD.ma_loai) THEN
    	 SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Không thể xóa vì có xe';
    END IF;
END$$

DELIMITER //
-- -----------------------------------------------------------------------
DELIMITER $$

CREATE TRIGGER DELETE_HANG_XE
BEFORE DELETE ON hang_xes
FOR EACH ROW
BEGIN
	IF EXISTS( SELECT 1 FROM xes WHERE xes.ma_hang = OLD.ma_hang) THEN
    	 SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Không thể xóa hãng vì có xe';
    END IF;
END$$

DELIMITER //
-- -----------------------------------------------------------------
DELIMITER //

CREATE PROCEDURE CapNhatTrangThai(
    IN bien_sos JSON
)
BEGIN
    -- Cập nhật trạng thái `dang_thue` trong bảng `bien_so_xe`
    UPDATE bien_so_xes bsx
    SET bsx.dang_thue = 1
    WHERE bsx.bien_so IN (
            SELECT CAST(bien_xe_json.value AS CHAR) 
            FROM JSON_TABLE(bien_sos, '$[*]' COLUMNS(value VARCHAR(255) PATH '$')) AS bien_xe_json
        );
    -- Cập nhật lại số lượng `co_san` trong bảng `xe`
    UPDATE xes
    SET co_san = (
        SELECT COUNT(*)
        FROM bien_so_xes
        WHERE bien_so_xes.ma_xe = xes.ma_xe AND bien_so_xes.dang_thue = 0
    );
END //

DELIMITER ;
-- -----------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE PROC_SEARCH_VEHICLE(IN keyword VARCHAR(255))
BEGIN
	SET keyword = LOWER(keyword);
	SELECT * FROM hang_xes hs JOIN xes ON hs.ma_hang = xes.ma_hang
    						  JOIN loai_xes ls ON xes.ma_loai = ls.ma_loai 
    WHERE xes.tinh_trang_xe = 1 AND LOWER(CONCAT_WS(
    '-',
    hs.ten_hang,
    ls.ten_loai,
    xes.ma_xe,
    xes.ten_xe,
    xes.phan_khoi,
    xes.gia_thue,
    xes.mo_ta
    )) LIKE CONCAT('%', keyword, '%');
END$$
DELIMITER //
-- -------------------------------------------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE PROC_ADD_DELIVERY_DETAIL(IN id VARCHAR(15))
BEGIN
	DECLARE done INT DEFAULT 0;
    DECLARE maXe VARCHAR(255);
    DECLARE soLuong INT;
    DECLARE bienSo VARCHAR(255);
    DECLARE error_message TEXT;
    -- Thêm cursor để duyệt qua chi tiết thuê xe
    DECLARE cur CURSOR FOR 
    SELECT ct.ma_xe, ct.so_luong
    FROM chi_tiet_thue_xes ct
    WHERE ct.ma_don_dat = id;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    -- transaction 
    START TRANSACTION;
    -- Làm việc với CURSOR
    OPEN cur;
    read_loop:LOOP
    	FETCH cur INTO maXe, soLuong;
        IF done THEN
            LEAVE read_loop;
        END IF;
        WHILE soLuong > 0 DO
        	SELECT bien_so INTO bienSo FROM bien_so_xes bsx 
            WHERE bsx.ma_xe = maXe 
            	AND bsx.dang_thue = 0 
           		AND bsx.tinh_trang = 1 
            LIMIT 1;
             IF bienSo IS NULL THEN
             	ROLLBACK;
                SET error_message = CONCAT('Không tìm thấy biển số khả dụng cho mã xe: ', maXe);
                SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = error_message;
            END IF;
            	
            -- Thêm chi tiết giao xe
        	INSERT INTO ct_giao_xes (ma_don_dat, bien_so) VALUES (id, bienSo);
            -- Cập nhật lại trạng thái xe là `đang thuê` (số lượng xe không cần update lại vì đã update khi tạo đơn thuê xe rồi)
			UPDATE bien_so_xes SET bien_so_xes.dang_thue = 1 WHERE bien_so_xes.bien_so = bienSo;
            SET soLuong = soLuong - 1;
    	END WHILE;
    END LOOP;

    -- Đóng cursor
    CLOSE cur;
    COMMIT;
END$$
DELIMITER //
-- --------------------------------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE PROC_UPDATE_VEHICLE_STATUS_AFTER_RENTAL_COMPLETION (IN id VARCHAR(10))
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        -- Rollback nếu có lỗi xảy ra
        ROLLBACK;
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Có lỗi xảy ra khi cập nhật';
    END;
    START TRANSACTION;
    -- UPDATE LẠI SỐ LƯỢNG XE CÓ SẴN
    UPDATE xes
    JOIN chi_tiet_thue_xes ct ON ct.ma_xe = xes.ma_xe
    SET xes.co_san = xes.co_san + ct.so_luong
    WHERE ct.ma_don_dat = id;
    
    -- UPDATE LẠI TRANG THÁI THUÊ CHO CÁC BIỂN SỐ XE
    UPDATE bien_so_xes bsx JOIN 
    ct_giao_xes ct ON bsx.bien_so = ct.bien_so
    SET bsx.dang_thue = 0
    WHERE ct.ma_don_dat = id;
    COMMIT;
END$$
DELIMITER //
-- ----------------------------------------------
CREATE VIEW MOST_RENTED_VEHICLE AS
select `qlthuexe`.`xes`.`ma_xe` AS `ma_xe`,`qlthuexe`.`xes`.`ten_xe` AS `ten_xe`,`ha`.`url` AS `url`,`ha`.`publicId` AS `publicId`,count(`ct`.`ma_xe`) AS `so_lan_thue` from ((`qlthuexe`.`hinh_anhs` `ha` join `qlthuexe`.`xes` on((`qlthuexe`.`xes`.`ma_xe` = `ha`.`ma_xe`))) left join `qlthuexe`.`chi_tiet_thue_xes` `ct` on((`qlthuexe`.`xes`.`ma_xe` = `ct`.`ma_xe`))) group by `qlthuexe`.`xes`.`ma_xe`,`qlthuexe`.`xes`.`ten_xe` having (`so_lan_thue` >= 1) order by `so_lan_thue` desc limit 10;

-- ----------------------------------------------------
CREATE VIEW NEW_VEHICLE AS
SELECT xes.ma_xe, xes.ten_xe, ha.url, ha.publicId 
FROM xes JOIN hinh_anhs ha ON xes.ma_xe = ha.ma_xe
WHERE xes.createdAt >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY) 
AND xes.tinh_trang_xe = 1
ORDER BY xes.createdAt DESC;
-- ----------------------------------------------------
</code>
</pre>
