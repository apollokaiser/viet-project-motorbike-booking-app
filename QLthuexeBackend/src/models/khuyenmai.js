import { Sequelize,sequelize } from "./index.js"

const khuyenMai = sequelize.define(
    'khuyen_mai',
    {
        // Model attributes are defined here
        ma_khuyen_mai: {
            type: Sequelize.STRING(15),
            primaryKey: true,
        },
        ten_khuyen_mai: {
            type: Sequelize.STRING(100),
            allowNull:true
        },
        mo_ta:{
            type:Sequelize.TEXT,
            allowNull:true
        },
        so_tien: {
            type: Sequelize.DECIMAL(10,2),
            allowNull:false
        },
        ngay_bat_dau: {
            type: Sequelize.DATE,
            allowNull:false
        },
        ngay_ket_thuc: {
            type: Sequelize.DATE,
            allowNull:true
        },
    },{
        timestamps:false,

    }
);

export default khuyenMai;