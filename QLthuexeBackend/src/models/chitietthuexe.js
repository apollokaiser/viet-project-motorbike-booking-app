import { Sequelize,sequelize } from "./index.js"
import thueXe from './thuexe.js';
import bienSoXe from "./biensoxe.js";

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
        bien_so: {
            type: Sequelize.STRING(15),
            primaryKey: true,
            references: {
                model: bienSoXe,
                key:'bien_so',
            }
        },
        gia_tien: {
            type: Sequelize.DECIMAL(10,2)
        }

    }, {
        timestamps: false,
    }
)
// 1-n
bienSoXe.hasMany(ctThueXe, { foreignKey: 'bien_so', as:"ctiet"});
ctThueXe.belongsTo(bienSoXe, { foreignKey: 'bien_so', as:"xe" });
//1-n
thueXe.hasMany(ctThueXe, { foreignKey: 'ma_don_dat', as:"detail" });
ctThueXe.belongsTo(thueXe, { foreignKey: 'ma_don_dat', as:"order" })
export default ctThueXe;