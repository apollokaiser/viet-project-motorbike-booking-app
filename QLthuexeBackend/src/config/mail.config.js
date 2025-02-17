import hbs from 'nodemailer-express-handlebars';
import nodemailer from "nodemailer"
const MAIL_USER = process.env.GMAIL_USER;
const MAIL_PASSWORD = process.env.GMAIL_PASS
const transporter = nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    auth:{
        user:MAIL_USER,
        pass:MAIL_PASSWORD
    }
})
transporter.use("compile", hbs({
    viewPath: "./src/views/email",
    extName: ".hbs",
    viewEngine:{
        extname:".hbs",
        defaultLayout: false,
        partialsDir: "./src/views/email/partials",
        layoutsDir: "./src/views/email/layouts",
        helpers:{
            formatDate: (date) => {
                return new Date(date* 1000).toLocaleTimeString()
            },
            formatMoney: (amount) => {
                return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
            },
            multify: (a,b) =>{
                return a * b
            },
            isNull : (a) =>{
                return a === null || a === undefined || a === ''
            }
        }
    }
}))
export default transporter;