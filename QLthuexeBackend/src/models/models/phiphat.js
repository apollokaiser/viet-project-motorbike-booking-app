import {  DataTypes } from 'sequelize';
import { sequelize } from './index.js';
import thueXe from './thuexe.js';


const phiPhat = sequelize.define(
    'phi_phat',
    {
        // Model attributes are defined here
        ma_phi_phat: {
            type: DataTypes.STRING(15),
            primaryKey: true,
        },
        ma_don_dat: {
            type: DataTypes.STRING(15),

        },
        ngay_tinh_phi: {
            type: DataTypes.DATE,
        },
        ly_do_phat: {
            type: DataTypes.STRING(15),
        },
        so_tien_phat: {
            type: DataTypes.INTERGER,
        },
        trang_thai_tt: {
            type: DataTypes.BOOLEAN,
        },

    },
    {
        // Other model options go here
    },
);

//1-1
thueXe.belongsTo(phiPhat, { foreignKey: 'ma_don_dat' });
phiPhat.hasOne(thueXe, { foreignKey: 'ma_don_dat' });
export default phiPhat;