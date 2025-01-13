import phiPhat from "../models/phiphat.js"
import {ResponseMessage, ResponseBody} from "../payload/ResponseMessage.js"  
export default class PhiPhatService {
    static async getAllPhiPhat(req,res) {
        try {
            const result = await phiPhat.findAll();
            return res.status(200).send(new ResponseBody("Get all fines successfully", result));
        } catch (error) {
            return res.status(200).send(new ResponseMessage("Error", 400));
        }
    }
}