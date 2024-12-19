import { adminApi } from "@/configs/axios";

export default class OrderService {
    static async getRecentOrders(page = 1, size = 7) {
        try {
            const response = await adminApi.get(`/don-hang/danh-sach-don-hang?page=${page}&size=${size}`);
            if (response.status === 200)
                return response.data.data;
        } catch (error) {
            return {};
        }
    }
    static async getExpiredOrders(page = 0, size = 7) {
        try {
            const response = await adminApi.get(`/don-hang/danh-sach-don-hang?expired=1?page=${page}&size=${size}`);
            if (response.status === 200)
                return response.data.data;
        } catch (error) {
            return {};
        }
    }
    static async changeOrderStatus(order_id, status) {
        try {
            const response = await adminApi.get(`/don-hang/change-status?id=${order_id}&status=${status}`);
            if (response.status === 200)
                return response.data;
            else throw new Error();
        } catch (error) {
            return null;
        }
    }
    static async getOrderStatus() {
        try {
            const response = await adminApi.get(`/don-hang/load-status`);
            if (response.status === 200)
                return response.data.data;
        } catch (error) {
            return null;
        }
    }
    static async getOrderDetail(id) { //
        try {
            //dùng axios user vì không cần thiết qquyeenf admin để xem chi tiết đơn thuê
            const response = await adminApi.get(`/don-hang/chi-tiet-don-hang?id=${id}`);
            console.log(response);
            if (response.status === 200)
                return response.data.data;
            else throw new Error();
        } catch (error) {
            return null;
        }
    }
}