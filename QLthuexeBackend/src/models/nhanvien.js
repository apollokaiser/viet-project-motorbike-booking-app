import { Sequelize, sequelize } from "./index.js"

const nhanVien = sequelize.define(
    'nhan_vien',
    {
        ma_nv: {
            type: Sequelize.STRING(15),
            primaryKey: true,
        },
        ho_ten: {
            type: Sequelize.STRING(50)
        },
        email: {
            type: Sequelize.STRING(30),
        },
        mat_khau: {
            type: Sequelize.STRING(30),
        }
    },
);
export default nhanVien;