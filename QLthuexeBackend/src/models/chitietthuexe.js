import { Sequelize,sequelize } from "./index.js"
import thueXe from './thuexe.js';
import Xe from "./xe.js";

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
                model:Xe,
                key:'ma_xe',
            }
        },
        gia_tien: {
            type: Sequelize.DECIMAL(10,2)
        },
        so_luong:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        the_chan:{
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        }
    }, {
        timestamps: false,
    }
)
// 1-n
Xe.hasMany(ctThueXe, { foreignKey: 'ma_xe', as:"ctiet"});
ctThueXe.belongsTo(Xe, { foreignKey: 'ma_xe', as:"xe" });
//1-n
thueXe.hasMany(ctThueXe, { foreignKey: 'ma_don_dat', as:"detail" });
ctThueXe.belongsTo(thueXe, { foreignKey: 'ma_don_dat', as:"order" })
export default ctThueXe;