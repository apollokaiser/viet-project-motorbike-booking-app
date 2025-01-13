import {sequelize,Sequelize} from "./index.js"

const phuongThucThanhToan = sequelize.define('phuong_thuc_giao_nhan',{
    ma_thanh_toan: {
        type: Sequelize.STRING(10),
        primaryKey: true
    },
    ten_thanh_toan:{
      type: Sequelize.STRING(100)
    }
}, {
    timestamps: false
})

export default phuongThucThanhToan;