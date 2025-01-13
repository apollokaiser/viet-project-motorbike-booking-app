import { sequelize, Sequelize } from "./index.js"

const tinhTrangThue = sequelize.define('tinh_trang_thue', {
    ma_tinh_trang: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    ten_tinh_trang: {
        type: Sequelize.STRING(50),
    },
},{
    timestamps: false
})

export default tinhTrangThue;