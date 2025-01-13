import { Sequelize, sequelize } from "./index.js"

const phiPhat = sequelize.define('phi_phat',{
    ma_phi_phat: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    ly_do_phat: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    tien_phat: {
        type: Sequelize.DECIMAL(10,2)
    }
},{
    timestamps: false
})
export default phiPhat;