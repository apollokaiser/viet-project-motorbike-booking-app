import { Sequelize,sequelize } from "./index.js"
import Xe from './xe.js';
import thueXe from './thuexe.js';

const ctThueXe = sequelize.define(
    'chi_tiet_thue_xe',
    {
        // Model attributes are defined here
        ma_don_dat: {
            type: Sequelize.STRING(15),
            primaryKey: true,
            references: {
                model: thueXe,
                key: 'ma_don_dat',
            },

        },
        ma_xe: {
            type: Sequelize.STRING(15),
            primaryKey: true,
            references: {
                model: Xe,
                key:'ma_xe',
            }
        },
        so_luong: {
            type: Sequelize.INTEGER,
            validate:{
                min:1
            },
            allowNull:false
        },
        gia_tien: {
            type: Sequelize.DECIMAL(10,2),
        },

    },
);
// 1-n
Xe.hasMany(ctThueXe, { foreignKey: 'ma_xe' });
ctThueXe.belongsTo(Xe, { foreignKey: 'ma_xe' });
//1-n
thueXe.hasMany(ctThueXe, { foreignKey: 'ma_don_dat' });
ctThueXe.belongsTo(thueXe, { foreignKey: 'ma_don_dat' })
export default ctThueXe;