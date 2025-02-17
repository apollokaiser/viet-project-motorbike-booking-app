import express from "express";
import routes from "./routers/web.js";
import { sequelize } from "./models/index.js";
import * as initialize from "./utils/initialize.js";
import corsConfig from "./config/cors.conf.js";
import ScheduleService from "./service/schedule.service.js";
const app = express();


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
corsConfig(app);
routes(app);
ScheduleService.sendExpiredOrderNotifacationEmailTask.start();

// //sequelize
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Cơ sở dữ liệu đã được đồng bộ hóa');
    // initialize.addLoaiXes();
    // initialize.addHangXes();
    // initialize.addPhiVanChuyen();
    // initialize.addAdminAccount();
    // initialize.addPhiPhat();
    // initialize.addPTThanhtoan();
    // initialize.addOrderStatus();
  })
  .catch((err) => {
    console.error('Lỗi đồng bộ hóa cơ sở dữ liệu:', err.message);
  });


const PORT = 8080;
app.listen(PORT, () => {
    console.log("Server is running in port:  " + PORT)
})