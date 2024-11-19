import { Sequelize, sequelize } from "./index.js"
import loaiXe from './loaixe.js';
import hangXe from './hangxe.js';

const Xe = sequelize.define(
    'xe',
    {
        ma_xe: {
            type: Sequelize.STRING(20),
            primaryKey: true,
        },
        ten_xe:{
            type: Sequelize.STRING(200),
            allowNull:false,
        },
        bien_so:{
            type: Sequelize.STRING(15),
            allowNull:false,
        },
        tinh_trang_xe: {
            type: Sequelize.TINYINT(1),
            defaultValue: true,
        },
        phan_khoi: {
            type: Sequelize.INTEGER,
            allowNull:false

        },
        gia_thue: {
            type: Sequelize.DECIMAL(10,2),
            allowNull:false
        },
        mo_ta: {
            type: Sequelize.STRING(1000),
            allowNull:true,
        },
        so_luong: {
            type: Sequelize.INTEGER,
            allowNull:false,
            validate:{
                min: 0
            }
        },
        xe_ton_kho: {
            type: Sequelize.INTEGER,
            allowNull:false,
            validate:{
                min: 0
            }
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

