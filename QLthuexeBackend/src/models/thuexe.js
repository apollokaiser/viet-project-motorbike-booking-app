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

        },
        ngay_bat_dau_thue: {
            type: Sequelize.DATE,
        },
        ngay_tra: {
            type: Sequelize.DATE,
        },
        tong_tien: {
            type: Sequelize.INTEGER,
        },
        tinh_trang_thue: {
            type: Sequelize.STRING(100),
        },
        CMND: {
            type: Sequelize.STRING(15),
            references: {
                model: khachHang,
                key: 'CMND',
            },
        },
     
    },
);
//thue xe 1-n
khachHang.hasMany(thueXe,{foreignKey:'CMND'});
thueXe.belongsTo(khachHang,{foreignKey:'CMND'});

export default thueXe;