import { verifyCardApi } from "@/configs/axios";
import FormData from "form-data";

export default class VerifyCardService {

    static getCMNDData = async (file) => {
        try {
            const data = new FormData();
            data.append("image", file);
            const result = await verifyCardApi.post("/idr/vnm", data);
            if (result.data.errorCode == 0) {
                return result.data.data[0];
            }
            return result.errorCode;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    static getGPLXData = async (file) => {
        try {
            const data = new FormData();
            data.append("image", file);
            const result = await verifyCardApi.post("/dlr/vnm", data);
            if (result.data.errorCode == 0) {
                return result.data.data[0];
            }
            return result.data.errorCode == 0;
        } catch (error) {
            return null;
        }
    }
}