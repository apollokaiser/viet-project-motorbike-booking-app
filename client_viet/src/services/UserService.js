import axios from "@/configs/axios";
import AuthService from "./AuthService";
export default class UserService {
    static async updateUserInfo(userInfo, phone) {
        try {
            userInfo = { ...userInfo, phone };
            const result = await axios.post("khach-hang/cap-nhat-thong-tin", { userInfo });
            if (result.data.status == 200) {
                AuthService.setLocalAuth(result.data.data);
                return result.data.data;
            }
            return null;
        } catch (error) {
            return null;
        }
    }
    static async getUserInfo(id) {
        try {
            const response = await axios.get(`/khach-hang/thong-tin?id=${id}`);
            return response.data;
        } catch (error) {
            return {};
        }
    }
    
}