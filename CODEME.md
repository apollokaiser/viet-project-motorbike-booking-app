<pre>
<code>
    DELIMITER $$

CREATE EVENT delete_old_orders
ON SCHEDULE EVERY 10 MINUTE
DO
BEGIN
    -- Cập nhật lại trạng thái xe nếu không thực hiện thuê xe (dành cho thanh toán online)
    UPDATE bien_so_xes AS bsx
    INNER JOIN chi_tiet_thue_xes AS cttx ON bsx.bien_so = cttx.bien_so
    INNER JOIN thue_xes AS tx ON tx.ma_don_dat = cttx.ma_don_dat
    SET bsx.dang_thue = 0
    WHERE tx.tinh_trang_thue = 0 
      AND TIMESTAMPDIFF(MINUTE, tx.createdAt, NOW()) >= 10;

    -- Xóa các đơn hàng cũ chưa được hoàn tất
    DELETE FROM thue_xes
    WHERE tinh_trang_thue = 0 
      AND TIMESTAMPDIFF(MINUTE, createdAt, NOW()) >= 10;
END$$

DELIMITER ;



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

CREATE VIEW orderDetail
AS SELECT ct.ma_don_dat, ct.bien_so, ct.gia_tien, ha.url, xes.ma_xe, xes.ten_xe
FROM chi_tiet_thue_xes ct JOIN bien_so_xes bsx ON ct.bien_so = bsx.bien_so
			 JOIN xes ON xes.ma_xe = bsx.ma_xe
			 JOIN hinh_anhs ha ON ha.ma_xe = xes.ma_xe 

-- ------------------------------------------------------------------------------------
DELIMITER $$
CREATE TRIGGER `CHECK_STATUS_ORDER_BEFORE_CHANGE` BEFORE UPDATE ON `thue_xes`
 FOR EACH ROW BEGIN
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
	IF OLD.tinh_trang_thue > NEW.tinh_trang_thue THEN
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
    if EXISTS(SELECT 1 FROM chi_tiet_thue_xes ct WHERE ct.bien_so = OLD.bien_so) THEN
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
    if EXISTS(SELECT 1 FROM bien_so_xes bsx JOIN chi_tiet_thue_xes ct ON bsx.bien_so = ct.bien_so  WHERE bsx.ma_xe = OLD.ma_xe) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Your custom error message';
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
</code>
</pre>
