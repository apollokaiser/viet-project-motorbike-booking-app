import { Sequelize, sequelize } from "./index.js"
import nhanVien from "./nhanvien.js";
import thueXe from './thuexe.js';


const hoaDon = sequelize.define(
    'hoa_don',
    {
        ma_don_dat: {
            type: Sequelize.STRING(15),
            primaryKey: true,
            references: {
                model: thueXe,
                key: 'ma_don_dat',
            },
        },
        ngay_lap_hd: {
            type: Sequelize.BIGINT(20),
            allowNull: false
        },
        so_tien_tt: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        ma_nv: {
            type: Sequelize.STRING(15),
            references:{
                model: nhanVien,
                key:"ma_nv"
            }
        }
    }, {
    timestamps: false
}
)
// thue xe hoa don 1-1
thueXe.hasOne(hoaDon, { foreignKey: 'ma_don_dat' });
hoaDon.belongsTo(thueXe, { foreignKey: 'ma_don_dat' });
// hoa don nhan vien 1-1
nhanVien.hasMany(hoaDon, { foreignKey: 'ma_nv' });
hoaDon.belongsTo(nhanVien, { foreignKey:"ma_nv" });
export default hoaDon;
