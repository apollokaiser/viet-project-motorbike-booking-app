import { adminApi } from "@/configs/axios";

export default class ReportService {
    static async getReport() {
        try {
            const response = await adminApi.get("/bao-cao/get-report");
            console.log(response);
            return response.data.status === 200 ? response.data.data : null;
        } catch (error) {
            return null;
        }
    }
}