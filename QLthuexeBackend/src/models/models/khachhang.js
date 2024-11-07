import {  DataTypes,sequelize } from 'sequelize';



const khachHang = sequelize.define(
    'khach_hang',
    {
        // Model attributes are defined here
        CMND: {
            type: DataTypes.STRING(15),
            primaryKey: true,
        },
        GPLX: {
            type: DataTypes.STRING(15),
        },
        ho_ten: {
            type: DataTypes.STRING(50),
        },
        email: {
            type: DataTypes.STRING(255),
        },
        SDT: {
            type: DataTypes.INTERGER,
        },
    },
    {
        // Other model options go here
    },
);

export default khachHang;