import axios from "@/configs/axios";
import AuthService from "./AuthService";
export default class UserService {
    static async updateUserInfo(userInfo, phone) {
        try {
            const result = await axios.post("khach-hang/cap-nhat-thong-tin", { userInfo: { ...userInfo, phone } });
            console.log(result);
            if (result.data.status == 200) {
                AuthService.setLocalAuth(result.data.data);
                return result.data.data;
            }
            return null;
        } catch (error) {
            return null
        }
    }
    static async getUserInfo(id) {
        try {
            console.log(id);
            const response = await axios.get(`/khach-hang/thong-tin?id=${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}