import axios from "@/configs/recognation.conf";
import FormData from "form-data";
export const getCMNDData = async (file) => {
    try {
        const data = new FormData();
        data.append("image", file);
        const result = await axios.post("/idr/vnm", data);
        if (result.data.errorCode == 0) {
            return result.data.data[0];
        }
        return result.errorCode;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export const getGPLXData = async (file) => {
    try {
        const data = new FormData();
        data.append("image", file);
        const result = await axios.post("/dlr/vnm", data);
        if (result.errorCode == 0) {
            return result.data.data;
        }
        return result.errorCode;
    } catch (error) {
        console.log(error);
        return null;
    }
}