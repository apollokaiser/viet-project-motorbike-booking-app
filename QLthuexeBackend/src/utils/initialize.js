import hangXe from "../models/hangxe.js";
import loaiXe from "../models/loaixe.js";
import vanChuyen from "../models/vanchuyen.js";
import nhanVien from "../models/nhanvien.js"
import phiPhat from "../models/phiphat.js";
import phuongThucThanhToan from "../models/phuongthucthanhtoan.js";
import tinhTrangThue from "../models/tinhtrangthue.js";
const brandsData = [
    {
        ma_hang: "HONDA",
        ten_hang: "HONDA"
    },
    {
        ma_hang: "SUZUKI",
        ten_hang: "SUZUKI"
    },
    {
        ma_hang: "YAMAHA",
        ten_hang: "YAMAHA"
    },
]
const categoriesData = [
    {
        ma_loai: "TG",
        ten_loai: "Tay ga"
    },
    {
        ma_loai: "XS",
        ten_loai: "Xe số"
    }
]
const phiVanChuyenData = [
    {
        from: 0,
        to: 1,
        phi_giao_xe: 0
    },
    {
        from: 1,
        to: 5,
        phi_giao_xe: 20000
    }
    , {
        from: 5,
        to: 10,
        phi_giao_xe: 30000
    },
    {
        from: 10,
        to: 999,
        phi_giao_xe: 40000
    }
]
const admin = {
    ma_nv: "admin",
    ho_ten: "Admin",
    email: "admin@example.com",
    mat_khau: "admin123",
}
const phiPhats = [
    {
        ma_phi_phat: 0,
        ly_do_phat: "Trễ hạn",
        tien_phat: 200000
    },
    {
        ma_phi_phat: 1,
        ly_do_phat: "Làm hư xe",
        tien_phat: 100000
    },
    {
        ma_phi_phat: 2,
        ly_do_phat: "Khác",
        tien_phat: 300000
    }
]
const ptThanhToanDatas = [
    {
        ma_thanh_toan: "ONLINE",
        ten_thanh_toan: "Thanh toán bằng chuyển khoản"
    },
    {
        ma_thanh_toan: "OFFLINE",
        ten_thanh_toan: "Thanh toán trực tiếp tại hãng"
    }, {
        ma_thanh_toan: "COD",
        ten_thanh_toan: "Thanh toán tại địa chỉ giao xe"
    }
]
export const orderStatus = [
    {
        ma_tinh_trang: 0,
        ten_tinh_trang: 'Chờ thanh toán'
    },
    {
        ma_tinh_trang: 1,
        ten_tinh_trang: 'Chờ xác nhận'
    },
    {
        ma_tinh_trang: 2,
        ten_tinh_trang: 'Đã xác nhận'
    },
    {
        ma_tinh_trang: 3,
        ten_tinh_trang: 'Đã giao'
    },
    {
        ma_tinh_trang: 4,
        ten_tinh_trang: 'Đã hủy'
    },
    {
        ma_tinh_trang: 5,
        ten_tinh_trang: 'Đã hoàn thành'
    }
]

export const addLoaiXes = async () => {
    try {
        const count = await loaiXe.count();
        if (count == 0) {
            loaiXe.bulkCreate(categoriesData);

        }
    } catch (error) {
        console.log("Initialize - CATEGORY failed: " + error);
    }
}
export const addHangXes = async () => {
    try {
        const count = await hangXe.count();
        if (count == 0) {
            hangXe.bulkCreate(brandsData);
        }
    } catch (error) {
        console.log("Initialize - BRAND failed: " + error)
    }
}
export const addPhiVanChuyen = async () => {
    try {
        const count = await vanChuyen.count();
        if (count == 0) {
            vanChuyen.bulkCreate(phiVanChuyenData);
        }
    } catch (error) {
        console.log("Initialize - PHI VAN CHUYEN failed: " + error)
    }
}
export const addAdminAccount = async () => {
    try {
        const count = await nhanVien.count();
        if (count == 0) {
            nhanVien.create(admin);
        }
    } catch (error) {
        console.log("Initialize - ADMIN ACCOUNT failed: " + error)
    }
}
export const addPhiPhat = async () => {
    try {
        const count = await phiPhat.count();
        if (count == 0) {
            phiPhat.bulkCreate(phiPhats);
        }
    } catch (error) {
        console.log("Initialize - PHI PHAT failed: " + error)
    }
}
export const addPTThanhtoan = async () => {
    try {
        const count = await phuongThucThanhToan.count();
        if (count == 0) {
            phuongThucThanhToan.bulkCreate(ptThanhToanDatas);
        }
    } catch (error) {
        console.log("Initialize - PHUONG THUC THANH TOAN failed: " + error)
    }
}
export const addOrderStatus = async () => {
    try {
        const count = await tinhTrangThue.count();
        if (count == 0) {
            tinhTrangThue.bulkCreate(orderStatus);
        }
    } catch (error) {
        console.log("Initialize - ORDER STATUS failed: " + error)
    }
}




