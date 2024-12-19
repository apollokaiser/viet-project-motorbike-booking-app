import { adminApi } from "@/configs/axios";
import axios from "@/configs/axios";
export default class CategoryService {

    static async getCategories() {
        try {
            const response = await axios.get("/loai-xe/get-loai-xe");
            if(response.data.status === 200) {
                return response.data.data;
            }
            return null;
        } catch (error) {
            return null;
        }
    }
    static async addCategory(category) {
        try {
            const result = await adminApi.post("/danh-muc/them-loai-xe", { ...category });
            return result.data.status == 200 ? result.data.data : null;
        } catch (error) {
            return null;
        }
    }
    static async deleteCategory(id) {
        try {
            const response = await adminApi.delete(`/danh-muc/xoa-loai-xe?id=${id}`);
            return response.data.status == 200 ? true : null;
        } catch (error) {
            return null;
        }
    }
    static async updateCategory(id, ten_loai) {
        try {
            const result = await adminApi.put("/danh-muc/cap-nhat-loai-xe", { id, ten_loai });
            return result.data.status == 200 ? true : null;
        } catch (error) {
            return null;
        }
    }
}