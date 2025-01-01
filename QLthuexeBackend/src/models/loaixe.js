import { Sequelize, sequelize } from "./index.js"

const loaiXe = sequelize.define(
    'loai_xe',
    {
        ma_loai: {
            type: Sequelize.STRING(15),
            primaryKey: true,
        },
        ten_loai: {
            type: Sequelize.STRING(15),
        },
    }, {
    timestamps: false
}
)
export default loaiXe;
