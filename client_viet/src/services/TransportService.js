import axios from "@/configs/axios";

export default class TransportService {
    static async getPhiVanChuyen() {
        try {
            const response = await axios.get("/van-chuyen");
            return response.data.data;
        } catch (error) {
            return [];
        }
    }
}