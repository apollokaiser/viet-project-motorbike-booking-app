import { Sequelize, sequelize } from "./index.js"
import Xe from "./xe.js";


const bienSoXe = sequelize.define(
    'bien_so_xe',
    {
        bien_so: {
            type: Sequelize.STRING(15),
            primaryKey: true,
        },
        dang_thue: {
            type: Sequelize.TINYINT(1),
            allowNull: false,
        },
        tinh_trang: {
            type: Sequelize.TINYINT(1),
            allowNull: false
        },
        ma_xe: {
            type: Sequelize.STRING(20),
            references: {
                model: Xe,
                key: 'ma_xe',

            }
        }
    },
    {
        timestamps: false,
    }
)
//1 -n 
Xe.hasMany(bienSoXe, { foreignKey: "ma_xe", as: "bienSoXes" });
bienSoXe.belongsTo(Xe, { foreignKey: "ma_xe", as: "vehicle" });
export default bienSoXe;