import axios, { adminApi } from "@/configs/axios";

export default class BrandService {
    static async getBrands() {
        try {
            const response = await axios.get(`/hang-xe/get-hang-xe`);
            return response.data.status == 200 ? response.data.data : null;
        } catch (error) {
            return null;
        }
    }
    static async addBrand(brand) { //
        try {
            const result = await adminApi.post("/hang-xe/them-hang-xe", { ...brand });
            return result.data.status == 200 ? result.data.data : null;
        } catch (error) {
            return null;
        }
    }
    static async deleteBrand(id) {
        try {
            const response = await adminApi.delete(`/hang-xe/xoa-hang-xe?id=${id}`);
            return response.data.status == 200 ? true : null;
        } catch (error) {
            return null;
        }
    }
    static async updateBrand(id, ten_hang) {
        try {
            const result = await adminApi.put("/hang-xe/cap-nhat-hang-xe", { id, ten_hang });
            return result.data.status == 200 ? true : null;
        } catch (error) {
            return null;
        }
    }
}
