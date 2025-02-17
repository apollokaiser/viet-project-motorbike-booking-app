import transporter from "../config/mail.config.js"
import AppAttributeService from "./appAttribute.service.js";
const MAIL_USER = process.env.GMAIL_USER;
export default class MailService {
    static async sendMail(to, subject, template, context) {
        const logo = await AppAttributeService.getLogo();
        try {
            transporter.sendMail({
                from: MAIL_USER,
                to,
                subject,
                template,
                context: {
                    context,
                    logo
                }
            })
            return true;
        } catch (error) {
            console.log("Error send mail: " + error);
            return null;
        }
    }
}