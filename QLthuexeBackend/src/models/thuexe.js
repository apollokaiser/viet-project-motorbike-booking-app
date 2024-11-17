import { Sequelize, sequelize } from "./index.js"
import khachHang from './khachhang.js';

const thueXe = sequelize.define(
    'thue_xe',
    {
        ma_don_dat: {
            type: Sequelize.STRING(15),
            primaryKey: true,
        },
        ngay_dat: {
            type: Sequelize.DATE,
            allowNull:false,
        },
        ngay_bat_dau_thue: {
            type: Sequelize.DATE,
            allowNull:false,
        },
        ngay_tra: {
            type: Sequelize.DATE,
            allowNull:false,
        },
        tong_tien: {
            type: Sequelize.DECIMAL(10,2),
            allowNull:false,
        },
        tinh_trang_thue: {
            type: Sequelize.INTEGER,
            allowNull:false,
        },
        google_id: {
            type: Sequelize.STRING(15),
            references: {
                model: khachHang,
                key: 'google_id',
            },
        },
     
    },
);
//thue xe 1-n
khachHang.hasMany(thueXe,{foreignKey:'google_id'});
thueXe.belongsTo(khachHang,{foreignKey:'google_id'});

export default thueXe;