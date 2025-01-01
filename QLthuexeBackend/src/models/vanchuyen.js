import { Sequelize, sequelize } from "./index.js"

const vanChuyen = sequelize.define(
    "phi_giao_xe",
    {
        ma_phi: {
            type: Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey: true,
        },
        from: {
            type: Sequelize.INTEGER
        },
        to: {
            type: Sequelize.INTEGER
        },
        phi_giao_xe: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull:false
        }
    },
    {
        timestamps:false
    }
)
export default vanChuyen;