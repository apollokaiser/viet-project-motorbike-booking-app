import axios from "@/configs/axios";


export const thanhToan = async (paymentInfo, paymentMethod, orderDetails) => {
    try {
        const result = await axios.post("/thanh-toan", {
            paymentInfo,
            paymentMethod,
            orderDetails,
        })
        return result.data;
    } catch (error) {
        return null;
    }
}
export const thanhToanOnline = async (paymentInfo, paymentMethod, orderDetails) => {
    try {
        const result = await axios.post("/thanh-toan/online-bank", {
            paymentInfo,
            paymentMethod,
            orderDetails,
        })
        return result.data;
    } catch (error) {
        return null;
    }
}
export const updateUserInfo = async (userInfo, phone = null) => {
    try {
        const result = await axios.post("khach-hang/cap-nhat-thong-tin", {userInfo, phone});
        return result.data;
    } catch (error) {
        return null;
    }
}