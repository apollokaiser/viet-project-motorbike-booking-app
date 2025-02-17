import MailService from "./mail.service.js";
import { sequelize } from "../models/index.js";
import cron from "node-cron"
const MY_EMAIL = process.env.MY_MAIL || "thinh.ngohoai@gmail.com"

export default class ScheduleService {
    static sendExpiredOrderNotifacationEmailTask = cron.schedule("0 0 * * *", async () => {
        console.log("Đang kiểm tra đơn quá hạn ...");
        const result = await sequelize.query("SELECT * FROM expired_orders", {
            type: sequelize.QueryTypes.RAW
        })
        console.log(`Hôm nay có ${result.length} đơn quá hạn !`);
        const subject = "Thông báo đơn quá hạn !"
        result.forEach(order => {
            MailService.sendMail(order.email, subject, "ExpiredOrderNotification", order);
        });
    }, {
        scheduled: true,
        timezone: "Asia/Ho_Chi_Minh"  // run in UTC+7 timezone
    })
} 
