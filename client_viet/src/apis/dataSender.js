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