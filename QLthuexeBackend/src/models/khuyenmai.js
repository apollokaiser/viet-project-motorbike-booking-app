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

        },
        so_tien: {
            type: Sequelize.INTEGER,
        },
        ngay_bat_dau: {
            type: Sequelize.DATE,
        },
        ngay_ket_thuc: {
            type: Sequelize.DATE,
        },
        giam_toi_da: {
            type: Sequelize.INTEGER,
        },

    },
);

export default khuyenMai;