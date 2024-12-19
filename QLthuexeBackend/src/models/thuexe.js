import { Sequelize, sequelize } from "./index.js"
import khachHang from './khachhang.js';
import vanChuyen from "./vanchuyen.js";

const thueXe = sequelize.define(
    'thue_xe',
    {
        ma_don_dat: {
            type: Sequelize.STRING(15),
            primaryKey: true,
        },
        ngay_dat: {
            type: Sequelize.BIGINT(19),
            allowNull: false,
        },
        ngay_bat_dau_thue: {
            type: Sequelize.BIGINT(19),
            allowNull: false,
        },
        ngay_tra: {
            type: Sequelize.BIGINT(19),
            allowNull: false,
        },
        ten_nguoi_nhan: {
            type: Sequelize.STRING(100),
        },
        dia_chi_nhan: {
            type: Sequelize.TEXT,
        },
        sdt: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        yeu_cau: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        tong_tien: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        phi_van_chuyen: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        tong_thue: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        tinh_trang_thue: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        da_giao_tien:{
            type: Sequelize.TINYINT(1),
            defaultValue: false,
        },
        tien_the_chan: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true
        },
        google_id: {
            type: Sequelize.STRING(50),
            references: {
                model: khachHang,
                key: 'google_id',
            },
        },
        ma_phi: {
            type: Sequelize.INTEGER,
            references: {
                model: vanChuyen,
                key: "ma_phi",
            },
        },

    },
);
//thue xe 1-n
khachHang.hasMany(thueXe, { foreignKey: 'google_id' });
thueXe.belongsTo(khachHang, { foreignKey: 'google_id' });
vanChuyen.hasMany(thueXe, { foreignKey: 'ma_phi', as: "thueXe" });
thueXe.belongsTo(vanChuyen, { foreignKey: 'ma_phi', as: 'vanChuyen' });
export default thueXe;
