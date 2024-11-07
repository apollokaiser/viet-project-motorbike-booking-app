import { Sequelize, sequelize } from "./index.js"
import loaiXe from './loaixe.js';
import hangXe from './hangxe.js';

const Xe = sequelize.define(
    'xe',
    {
        ma_xe: {
            type: Sequelize.STRING(15),
            primaryKey: true,
        },
        tinh_trang_xe: {
            type: Sequelize.STRING(30),
        },
        phan_khoi: {
            type: Sequelize.STRING(30),
        },
        gia_thue: {
            type: Sequelize.INTEGER,
        },
        mo_ta: {
            type: Sequelize.STRING(1000),
        },
        so_luong: {
            type: Sequelize.INTEGER,
        },
        xe_ton_khoi: {
            type: Sequelize.INTEGER,
        },
        ma_loai:{
            type: Sequelize.STRING(15),
            references: {
                model: loaiXe,
                key: 'ma_loai',
            },
        },
        ma_hang:{
            type: Sequelize.STRING(15),
            references: {
                model: hangXe,
                key:'ma_hang',
            },
        }
    },
);
// loai xe 1-n
loaiXe.hasMany(Xe, { foreignKey:'ma_loai'});
Xe.belongsTo(loaiXe,{foreignKey:'ma_loai'});
//hang xe 1-n
hangXe.hasMany(Xe,{foreignKey:'ma_hang'});
Xe.belongsTo(hangXe,{foreignKey:'ma_hang'});

export default Xe;

