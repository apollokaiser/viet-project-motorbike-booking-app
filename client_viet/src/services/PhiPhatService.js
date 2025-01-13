import { adminApi } from "@/configs/axios";
export default class PhiPhatService {
    static async getAllFines() {
        try {
            const response = await adminApi.get("/phi-phat/get-all-fines");
            return response.data.status === 200 ? response.data.data : null;
        } catch (error) {
            return null;
        }
    }
}