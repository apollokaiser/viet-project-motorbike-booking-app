import hangXe from "../models/hangxe.js";
import loaiXe from "../models/loaixe.js";
import vanChuyen from "../models/vanchuyen.js";
import nhanVien from "../models/nhanvien.js"
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
        phi_van_chuyen: 0
    },
    {
        from: 1,
        to: 5,
        phi_van_chuyen: 20000
    }
    ,{
        from: 5,
        to: 10,
        phi_van_chuyen: 30000
    },
    {
        from: 10,
        to: 999,
        phi_van_chuyen: 40000
    }
]
const admin = {
    ma_nv: "admin",
    ho_ten: "Admin",
    email: "admin@example.com",
    mat_khau: "admin123",
}

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
            hangXe.create(brandsData);
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


export const orderStatus = {
    PENDING_PAYMENT: {
        id: 0,
        name: 'Chờ thanh toán'
    },
    WAITING_CONFIRMATION: {
        id: 1,
        name: 'Chờ xác nhận'
    },
    CONFIRMED: {
        id: 2,
        name: 'Đã xác nhận'
    },
    DELIVERED: {
        id: 3,
        name: 'Đã giao'
    },
    RETURNED: {
        id: 4,
        name: 'Đã trả'
    },
    CANCELLED: {
        id: 5,
        name: 'Đã hủy'
    }
}
