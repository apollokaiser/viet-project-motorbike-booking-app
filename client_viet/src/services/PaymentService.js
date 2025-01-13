import axios from "@/configs/axios";

export default class PaymentService {
    static async thanhToan(paymentInfo, paymentMethod, orderDetails) {
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
    static async thanhToanOnline(paymentInfo, paymentMethod, orderDetails) {
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
    static async getPaymentMethods() {
        try {
            const result = await axios.get("/thanh-toan/phuong-thuc-thanh-toan");
            return result.data.status === 200 ? result.data.data : null;
        } catch (error) {
            return null;
        }
    }
}