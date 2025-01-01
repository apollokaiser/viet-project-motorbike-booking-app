import vanChuyen from "../models/vanchuyen.js";
import { ResponseMessage, ResponseBody } from "../payload/ResponseMessage.js"

class VanChuyenService {
    static async getPhiVanChuyen(req, res) {
        try {
            const result = await vanChuyen.findAll();
            return res.status(200).send(new ResponseBody("Get transport fee successfully", result));
        } catch (e) {
            console.log("error get transport fee : " + e);
            return res.status(200).send(new ResponseMessage("Error", 400));
        }
    }
}

export default VanChuyenService;