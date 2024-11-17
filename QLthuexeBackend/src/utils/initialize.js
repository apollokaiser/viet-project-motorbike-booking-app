import hangXe from "../models/hangxe.js";
import loaiXe from "../models/loaixe.js";
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

export const addLoaiXes = async () => {
    try {
        const count = await loaiXe.count();
        if (count == 0) {
            categoriesData.map(category=>{
                loaiXe.create(category);
            })
        }
    } catch (error) {
        console.log("Initialize - CATEGORY failed: " + error);
    }
}
export const addHangXes = async () => {
    try {
        const count = await hangXe.count();
        if (count == 0) {
            brandsData.map(brand=>{
                hangXe.create(brand);
            })
        }
    } catch (error) {
        console.log("Initialize - BRAND failed: " + error)
    }
}


export const orderStatus = {
    PENDING:{
        id:1,
        name:'Đang chờ'
    },
    DELIVERED:{
        id:2,
        name:'Đã giao'
    },
    RETURNED:{
        id:3,
        name:'Đã trả'
    },
    CANCELLED:{
        id:4,
        name:'Đã hủy'
    }
}
