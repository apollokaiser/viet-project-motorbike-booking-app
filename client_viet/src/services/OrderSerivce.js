import webApi, { adminApi } from "@/configs/axios";

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
    static async getOrders(status = null, expired = false, dateFrom, dateTo , search = null, order = "ASC", page = 0, size = 7) {
        try {
            let condition = {
                page,
                size,
                order: order,
                expired: expired,
                date_from:dateFrom,
                date_to:dateTo,
            };
            if (status) condition.status = status;
            if (search) condition.search = search;
            const response = await adminApi.get(`/don-hang/danh-sach-don-hang`, { params: condition });
            if (response.data.status === 200)
                return response.data.data;
            return null;
        } catch (error) {
            return null;
        }
    }
    static async changeOrderStatus(order_id, status, the_chan = 0) {
        try {
            const response = await adminApi.get(`/don-hang/change-status?id=${order_id}&status=${status}&the_chan=${the_chan}`);
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
            if (response.data.status == 200)
                return response.data.data;
            return null;
        } catch (error) {
            return null;
        }
    }
    static async getOrderStatusByCustomer() {
        try {
            const response = await webApi.get(`/don-hang/load-status`);
            if (response.status === 200)
                return response.data.data;
            return null;
        } catch (error) {
            return null;
        }
    }
    static async getOrderDetail(id) { //
        try {
            //dùng axios user vì không cần thiết qquyeenf admin để xem chi tiết đơn thuê
            const response = await adminApi.get(`/don-hang/chi-tiet-don-hang?order_id=${id}`);
            console.log(response);
            if (response.status === 200)
                return response.data.data;
            else throw new Error();
        } catch (error) {
            return null;
        }
    }
    static async rentalComletion(bill, fines) {
        try {
            const response = await adminApi.post("/don-hang/rental-completion", {
                bill, fines
            })
            return response.data.status === 200 ? true : null;
        } catch (error) {
            return null;
        }
    }
    static async getOrderByCustomerID(id) {
        try {
            const response = await webApi.get(`/don-hang/customer-orders?id=${id}`);
            if (response.status === 200)
                return response.data.data;
            return null;
        } catch (error) {
            return null;
        }
    }
    static async getOrderDetailByCutomer(order_id) {
        try {
            const response = await webApi.get(`/don-hang/chi-tiet-don-hang?order_id=${order_id}`);
            console.log(response);
            if (response.data.status === 200)
                return response.data.data;
            return null;
        } catch (error) {
            return null;
        }
    }
}