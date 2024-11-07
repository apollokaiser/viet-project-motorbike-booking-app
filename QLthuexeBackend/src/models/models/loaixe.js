import {  DataTypes } from 'sequelize';
import { sequelize } from './index.js';

const loaiXe = sequelize.define(
    'loai_xe',
    {
        // Model attributes are defined here
        ma_loai: {
            type: DataTypes.STRING(15),
            primaryKey: true,
        },
        ten_loai: {
            type: DataTypes.STRING(15),

        },


    },
    {
        // Other model options go here
    },
);
export default  loaiXe;
