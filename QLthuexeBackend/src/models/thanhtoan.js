import {Sequelize, sequelize } from "./index.js"
import thueXe from './thuexe.js';


const thanhToan = sequelize.define(
    'thanh_toan',
    {
        ma_thanh_toan: {
            type: Sequelize.STRING(15),
            primaryKey: true,
        },
        phuong_thuc_tt: {
            type: Sequelize.ENUM({
                values:['ONLINE', 'OFFLINE']
            }),
        },
        ngay_tt: {
            type: Sequelize.BIGINT(20),
            allowNull:false
        },
        so_tien_tt: {
            type: Sequelize.DECIMAL(10,2),
            allowNull:false
        },
        //FK_THUEXE_THANHTOAN
        ma_don_dat: {
            type: Sequelize.STRING(15),
            references: {
                model: thueXe,
                key: 'ma_don_dat',
            },
        }
    },{
        timestamps: false,
    }
)
// thue xe thanh toan 1-1
thueXe.hasOne(thanhToan, { foreignKey: 'ma_don_dat' });
thanhToan.belongsTo(thueXe, { foreignKey: 'ma_don_dat' });

export default thanhToan;
