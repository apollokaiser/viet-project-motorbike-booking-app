import {sequelize} from "../models/index.js";
import {ResponseMessage, ResponseBody} from "../payload/ResponseMessage.js"
export default class ReportService {
    static async getReport(req,res) {
        try {
            const reports = await sequelize.query("select * from thongke",{
                type: sequelize.QueryTypes.SELECT
            })
            if(!reports || !reports.length ) {
                return res.status(200).send(new ResponseMessage("No report",400));
            }
            return res.status(200).send(new ResponseBody("Get report successfully", reports));
        } catch (error) {
            console.log(error);
            return res.status(200).send(new ResponseMessage("error", 400))
        }
    }
}
