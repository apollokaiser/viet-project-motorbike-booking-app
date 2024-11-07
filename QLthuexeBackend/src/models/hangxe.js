import { Sequelize,sequelize } from "./index.js"


const hangXe = sequelize.define(
    'hang_xe',
    {
        // Model attributes are defined here
        ma_hang: {
            type: Sequelize.STRING(15),
            primaryKey: true,
        },
        ten_hang: {
            type: Sequelize.STRING(50),
        },
    },
);
export default hangXe;
