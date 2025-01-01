import { Sequelize,sequelize } from "../index.js"

const orderDetail = sequelize.define(
    'orderdetail',
    {
        // Model attributes are defined here
        ma_don_dat: {
            type: Sequelize.STRING(15),
        },
        bien_so: {
            type: Sequelize.STRING(50),
        },
        gia_tien:{
            type: Sequelize.DECIMAL(10,2),
        },
        url:{ // url hinh anh
            type: Sequelize.STRING(1000),
        },
        ma_xe:{
            type: Sequelize.STRING(20)
        },
        ten_xe:{
            type: Sequelize.STRING(200)
        }
    },{
        timestamps: false,
        freezeTableName:true,
        tableName: 'orderdetail'
    }
);
export default orderDetail;