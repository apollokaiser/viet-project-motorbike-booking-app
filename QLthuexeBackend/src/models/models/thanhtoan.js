import {  DataTypes } from 'sequelize';
import { sequelize } from './index.js';
import thueXe from './thuexe.js';


const thanhToan = sequelize.define(
    'thanh_toan',
    {
        // Model attributes are defined here
        ma_thanh_toan: {
            type: DataTypes.STRING(15),
            primaryKey: true,
        },
        ma_don_dat: {
            type: DataTypes.STRING(15),

        },
        phuong_thuc_tt: {
            type: DataTypes.STRING(100),
        },
        ngay_tt: {
            type: DataTypes.DATE,
        },
        so_tien_tt: {
            type: DataTypes.INTERGER,
        },
        noi_dung_tt: {
            type: DataTypes.STRING(1000),
        },
        tien_the_chan: {
            type: DataTypes.INTERGER,
        },


    },
    {
        // Other model options go here
    },
);
// thue xe thanh toan 1-1
thueXe.belongsTo(thanhToan, { foreignKey: 'ma_don_dat' });
thanhToan.hasOne(thueXe, { foreignKey: 'ma_don_dat' });

export default thanhToan;
