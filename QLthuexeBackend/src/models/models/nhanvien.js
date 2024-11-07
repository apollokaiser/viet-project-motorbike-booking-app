import {  DataTypes } from 'sequelize';
import { sequelize } from './index.js';

const nhanVien = sequelize.define(
    'nhanvien',
    {
        // Model attributes are defined here
        ma_NV: {
            type: DataTypes.STRING(15),
            primaryKey: true,
        },
    ho_ten: {
    type: DataTypes.STRING(50),
      // allowNull defaults to true
    },
    email:{
        type: DataTypes.STRING(30),
    },
    mat_khau:{
        type: DataTypes.STRING(30),
    }
    },
{
    // Other model options go here
},
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true