import { Sequelize, sequelize } from "./index.js"
const nhanVien = sequelize.define(
    'nhan_vien',
    {
        ma_nv: {
            type: Sequelize.STRING(15),
            primaryKey: true,
        },
        ho_ten: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(30),
            validate: {
                isEmail: { msg: "Please enter a valid email address" }
            },
            allowNull: false

        },
        mat_khau: {
            type: Sequelize.STRING(30),
            validate: {
                min: 8,
                max: 25
            },
            allowNull: false
        }
    },{
        timestamps: false
    }
)
export default nhanVien;