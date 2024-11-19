import hangXe from "../models/hangxe.js";
import loaiXe from "../models/loaixe.js";
import vanChuyen from "../models/vanchuyen.js";
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
        ma_phi: "internal",
        ma_quan: '778',
        ma_tinh: '79',
        phi_van_chuyen: 0
    },
    {
        ma_phi: "external",
        phi_van_chuyen: 50000
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
        id: 3,
        name: 'Đã trả'
    },
    CANCELLED: {
        id: 4,
        name: 'Đã hủy'
    }
}
