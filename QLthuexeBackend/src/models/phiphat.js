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
        ma_don_dat: {
            type: Sequelize.STRING(15),
            references: {
                model: thueXe,
                key: 'ma_don_dat',
            }

        },
        ngay_tinh_phi: {
            type: Sequelize.DATE,
        },
        ly_do_phat: {
            type: Sequelize.STRING(15),
        },
        so_tien_phat: {
            type: Sequelize.INTEGER,
        },
        trang_thai_tt: {
            type: Sequelize.BOOLEAN,
        },

    },
);

//1-1
thueXe.hasOne(phiPhat, { foreignKey: 'ma_don_dat' });
phiPhat.belongsTo(thueXe, { foreignKey: 'ma_don_dat' });


export default phiPhat;