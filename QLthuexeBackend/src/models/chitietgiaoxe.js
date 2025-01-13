import bienSoXe from "./biensoxe.js";
import { sequelize,Sequelize } from "./index.js";
import thueXe from "./thuexe.js";

const ctGiaoXe = sequelize.define("ct_giao_xe", {
    ma_don_dat: {
        type: Sequelize.STRING(15),
        primaryKey: true,
        references:{
            model: thueXe,
            key: "ma_don_dat"
        }
    },
    bien_so:{
        type: Sequelize.STRING(15),
        primaryKey: true,
        references:{
            model: bienSoXe,
            key: "bien_so"
        }
    }
},{
    timestamps: false
})
bienSoXe.hasMany(ctGiaoXe, {foreignKey:"bien_so", as:"ctGiaoXes"})
ctGiaoXe.belongsTo(bienSoXe, {foreignKey:"bien_so", as:"bienSo"})

thueXe.hasMany(ctGiaoXe, {foreignKey:"ma_don_dat", as:"giaoXe"})
ctGiaoXe.belongsTo(thueXe, {foreignKey:"ma_don_dat", as:"order"})
export default ctGiaoXe;