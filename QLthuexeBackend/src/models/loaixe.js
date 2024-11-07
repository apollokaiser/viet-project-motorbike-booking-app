import {Sequelize, sequelize } from "./index.js"

const loaiXe = sequelize.define(
    'loai_xe',
    {
        // Model attributes are defined here
        ma_loai: {
            type: Sequelize.STRING(15),
            primaryKey: true,
        },
        ten_loai: {
            type: Sequelize.STRING(15),
        },
    },
);
export default  loaiXe;
