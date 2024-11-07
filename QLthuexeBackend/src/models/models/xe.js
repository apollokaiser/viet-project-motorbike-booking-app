import { DataTypes } from 'sequelize';
import { sequelize} from './index.js';
import loaiXe from './loaixe.js';
import hangXe from './hangxe.js';


const Xe = sequelize.define(
    'xe',
    {
        // Model attributes are defined here
        ma_xe: {
            type: DataTypes.STRING(15),
            primaryKey: true,
        },
        loai_xe: {
            type: DataTypes.STRING(30),

        },
        hang_xe: {
            type: DataTypes.STRING(30),
        },
        tinh_trang_xe: {
            type: DataTypes.STRING(30),
        },
        phan_khoi: {
            type: DataTypes.STRING(30),
        },
        gia_thue: {
            type: DataTypes.INTERGER,
        },
        mo_ta: {
            type: DataTypes.STRING(1000),
        },
        so_luong: {
            type: DataTypes.INTERGER,
        },
        xe_ton_khoi: {
            type: DataTypes.INTERGER,
        },
        hinh_anh: {
            type: DataTypes.STRING(100),
        },
    },
    {
        // Other model options go here
    },
);
// loai xe 1-n
loaiXe.hasMany(Xe, { foreignKey:'ma_loai'});
Xe.belongsTo(loaiXe,{foreignKey:'loai_xe'});
//hang xe 1-n
hangXe.hasMany(Xe,{foreignKey:'ma_hang'});
Xe.belongsTo(hangXe,{foreignKey:'hang_xe'});

export default Xe;

