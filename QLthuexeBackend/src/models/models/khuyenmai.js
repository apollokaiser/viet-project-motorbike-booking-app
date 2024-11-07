import {  DataTypes } from 'sequelize';
import { sequelize } from './index.js';

const khuyenMai = sequelize.define(
    'khuyen_mai',
    {
        // Model attributes are defined here
        ma_khuyen_mai: {
            type: DataTypes.STRING(15),
            primaryKey: true,
        },
        ten_khuyen_mai: {
            type: DataTypes.STRING(100),

        },
        so_tien: {
            type: DataTypes.INTERGER,
        },
        ngay_bat_dau: {
            type: DataTypes.DATE,
        },
        ngay_ket_thuc: {
            type: DataTypes.DATE,
        },
        giam_toi_da: {
            type: DataTypes.INTERGER,
        },

    },
    {
        // Other model options go here
    },
);

export default khuyenMai;