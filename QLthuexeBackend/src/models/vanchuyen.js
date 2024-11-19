import { Sequelize, sequelize } from "./index.js"
const vanChuyen = sequelize.define(
    "phi_van_chuyen",
    {
        ma_phi: {
            type: Sequelize.STRING(20),
            primaryKey: true,
        },
        ma_quan: {
            type: Sequelize.INTEGER
        },
        ma_tinh: {
            type: Sequelize.INTEGER
        },
        phi_van_chuyen: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull:false
        }
    },
    {
        timestamps:false
    }
)
export default vanChuyen;