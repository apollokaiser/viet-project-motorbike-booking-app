import thueXe from './thuexe.js';
import { Sequelize,sequelize } from "./index.js"


const phiPhat = sequelize.define(
    'phi_phat',
    {
        // Model attributes are defined here
        ma_phi_phat: {
            type: Sequelize.STRING(15),
            primaryKey: true,
        },
        ngay_tinh_phi: {
            type: Sequelize.DATE,
            allowNull:false,
        },
        ly_do_phat: {
            type: Sequelize.STRING(15),
        },
        so_tien_phat: {
            type: Sequelize.DECIMAL(10,2),
            allowNull:false,
        },
        trang_thai_tt: {
            type: Sequelize.TINYINT(1),
            allowNull:false,
        },
        ma_don_dat: {
            type: Sequelize.STRING(15),
            references: {
                model: thueXe,
                key: 'ma_don_dat',
            }
        
        },
        
    },{
        timestamps: false,
    }
)

//1-1
thueXe.hasOne(phiPhat, { foreignKey: 'ma_don_dat', as:"phat" });
phiPhat.belongsTo(thueXe, { foreignKey: 'ma_don_dat', as:"order" });


export default phiPhat;