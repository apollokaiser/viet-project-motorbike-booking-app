import { Sequelize, sequelize } from "./index.js"
import Xe from "./xe.js"
const hinhAnh = sequelize.define('hinh_anh', {
    ma_hinh_anh: {
        type: Sequelize.STRING(15),
        primaryKey: true,
    },
    ten_hinh_anh: {
        type: Sequelize.STRING(255),
    },
    slug: {
        type: Sequelize.STRING(255),
    },
    ma_xe: {
        type: Sequelize.STRING(15),
        references: {
            model: Xe,
            key: 'ma_xe',
        },
    },
})
Xe.hasMany(hinhAnh,{foreignKey:"ma_xe"})
hinhAnh.belongsTo(Xe,{foreignKey:"ma_xe"})
export default hinhAnh;