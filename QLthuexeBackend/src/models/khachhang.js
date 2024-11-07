import { Sequelize, sequelize } from "./index.js"

const khachHang = sequelize.define(
    'khachHang',
    {
        CMND: {
            type: Sequelize.STRING(15),
            unique: true
        },
        google_id:{
            type: Sequelize.STRING(50),
            primaryKey: true,
        },
        GPLX: {
            type: Sequelize.STRING(15),
        },
        ho_ten: {
            type: Sequelize.STRING(50),
        },
        email: {
            type: Sequelize.STRING(255),
        },
        SDT: {
            type: Sequelize.INTEGER,
        }
    },
);
export default khachHang;