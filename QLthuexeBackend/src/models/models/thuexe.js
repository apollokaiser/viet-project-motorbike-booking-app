import {  DataTypes} from 'sequelize';
import { sequelize } from './index.js';
import khachHang from './khachhang.js';


const thueXe = sequelize.define(
    'thue_xe',
    {
        // Model attributes are defined here
        ma_don_dat: {
            type: DataTypes.STRING(15),
            primaryKey: true,
        },
        ngay_dat: {
            type: DataTypes.DATE,

        },
        ngay_bat_dau_thue: {
            type: DataTypes.DATE,
        },
        ngay_tra: {
            type: DataTypes.DATE,
        },
        tong_tien: {
            type: DataTypes.INTERGER,
        },
        tinh_trang_thue: {
            type: DataTypes.STRING(1000),
        },
        CMND: {
            type: DataTypes.STRING(15),
        },
     
    },
    {
        // Other model options go here
    },
);
//thue xe 1-n
khachHang.hasMany(thueXe,{foreignKey:'CMND'});
thueXe.belongsTo(khachHang,{foreignKey:'CMND'});

export default thueXe;