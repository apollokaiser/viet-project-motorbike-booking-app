import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';
import thueXe from './thuexe.js';
import Xe from './xe.js';


const ctThueXe = sequelize.define(
    'chi_tiet_thue_xe',
    {
        // Model attributes are defined here
        ma_don_dat: {
            type: DataTypes.STRING(15),

        },
        ma_xe: {
            type: DataTypes.STRING(15),

        },
        so_luong: {
            type: DataTypes.INTERGER,
        },
        gia_tien: {
            type: DataTypes.INTERGER,
        },

    },
    {
        // Other model options go here
    },
);
// 1-n
Xe.hasMany(ctThueXe, { foreignKey: 'ma_xe' });
ctThueXe.belongsTo(Xe, { foreignKey: 'ma_xe' });
//1-n
thueXe.hasMany(ctThueXe, { foreignKey: 'ma_don_dat' });
ctThueXe.belongsTo(thueXe, { foreignKey: 'ma_don_dat' });