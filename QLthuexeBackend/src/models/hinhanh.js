import { Sequelize, sequelize } from "./index.js"
import Xe from "./xe.js"
const hinhAnh = sequelize.define('hinh_anh', {
    ma_hinh_anh: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    url: {
        type: Sequelize.STRING(255),
        validate:{
            isUrl: true,
            msg: "URL is not valid"
        }
    },
    ma_xe: {
        type: Sequelize.STRING(15),
        references: {
            model: Xe,
            key: 'ma_xe',
        },
    },
})
Xe.hasMany(hinhAnh,{foreignKey:"ma_xe",as: "hinhAnhs"})
hinhAnh.belongsTo(Xe,{foreignKey:"ma_xe", as:'xe'})
export default hinhAnh;

