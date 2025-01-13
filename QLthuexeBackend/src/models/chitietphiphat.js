import thueXe from './thuexe.js';
import { Sequelize, sequelize } from "./index.js"
import phiPhat from './phiphat.js';

const chi_tiet_phi_phat = sequelize.define(
    'chi_tiet_phi_phat',
    {
        ma_phi_phat: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: phiPhat,
                key: 'ma_phi_phat',
            }
        },
        ma_don_dat: {
            type: Sequelize.STRING(15),
            primaryKey: true,
            references: {
                model: thueXe,
                key: 'ma_don_dat',
            }
        },
        ngay_tinh_phi: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },
        ly_do_phat: {
            type: Sequelize.STRING(15),
        },
        tien_phat: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },

    }, {
    timestamps: false,
}
)

//1-n
thueXe.hasMany(chi_tiet_phi_phat, { foreignKey: 'ma_don_dat', as: "phat" });
chi_tiet_phi_phat.belongsTo(thueXe, { foreignKey: 'ma_don_dat', as: "order" });

//1-n
phiPhat.hasMany(chi_tiet_phi_phat, { foreignKey: 'ma_phi_phat', as: "chitiet" });
chi_tiet_phi_phat.belongsTo(phiPhat, { foreignKey: 'ma_phi_phat', as: "phiPhat" });



export default chi_tiet_phi_phat;