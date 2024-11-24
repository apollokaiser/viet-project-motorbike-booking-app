import { Sequelize, sequelize } from "./index.js"

const khachHang = sequelize.define(
    'khachHang',
    {
        CMND: {
            type: Sequelize.STRING(15),
            validate:{
                isNumeric:true,
            }
        },
        google_id:{
            type: Sequelize.STRING(50),
            primaryKey: true,
        },
        ho_ten: {
            type: Sequelize.STRING(50),
        },
        email: {
            type: Sequelize.STRING(255),
            validate:{
                isEmail:true
            }
        },
        SDT: {
            type: Sequelize.STRING(20),
        },
        GPLX: {
            type: Sequelize.STRING(15),
        },
        GPLX_type:{
            type: Sequelize.STRING(5),
        }
    },
);
export default khachHang;