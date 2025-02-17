import { adminApi } from "@/configs/axios";


export default class SettingService {
    static async getAttribute(key) {
        try {
            const response = await adminApi.get(`/settings/get-attribute?key=${key}`);
            return response.data.status === 200 ? response.data.data : null;
        } catch (error) {
            return null;
        }
    }
    static async getAttributes() {
        try {
            const response = await adminApi.get(`/settings/get-attributes`);
            return response.data.status === 200 ? response.data.data : null;
        } catch (error) {
            return null;
        }
    }
    static async updateAttributes(attrs) {
        try {
            const response = await adminApi.put(`/settings/update-attributes`,{attrs});
            return response.data.status === 200 ? true : false;
        } catch (error) {
            return null;
        }
    }
}