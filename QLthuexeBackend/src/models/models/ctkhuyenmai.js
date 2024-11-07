import {  DataTypes } from 'sequelize';
import { sequelize } from './index.js';
import Xe from './xe.js';
import khuyenMai from './khuyenmai.js';


const ctKhuyenMai = sequelize.define(
    'ct_thue_xe',
    {
        // Model attributes are defined here
        ma_hang: {
            type: DataTypes.STRING(15),
            primaryKey: true,
        },
        ma_khuyen_mai: {
            type: DataTypes.STRING(15),
            primaryKey: true,

        },


    },
    {
        // Other model options go here
    },
);
// 1-n
Xe.hasMany(ctKhuyenMai, { foreignKey: 'ma_hang' });
ctKhuyenMai.belongsTo(Xe, { foreignKey: 'ma_hang' });
//1-n
khuyenMai.hasMany(ctKhuyenMai, { foreignKey: 'ma_khuyen_mai' });
ctKhuyenMai.belongsTo(khuyenMai, { foreignKey: 'ma_khuyen_mai' });