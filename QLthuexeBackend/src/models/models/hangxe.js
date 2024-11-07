import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';


const hangXe = sequelize.define(
    'hang_xe',
    {
        // Model attributes are defined here
        ma_hang: {
            type: DataTypes.STRING(15),
            primaryKey: true,
        },
        ten_hang: {
            type: DataTypes.STRING(50),
            // allowNull defaults to true
        },
    },
    {
        // Other model options go here
    },
);
export default hangXe;
