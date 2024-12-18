import express from "express";
import configViewEngine from "./config/viewEngine.js";
import routes from "./routers/web.js";
import { sequelize } from "./models/index.js";
import * as initialize from "./utils/initialize.js";
import corsConfig from "./config/cors.conf.js";
const app = express();


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
configViewEngine(app);
corsConfig(app);
routes(app);

//sequelize
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Cơ sở dữ liệu đã được đồng bộ hóa');
    initialize.addLoaiXes();
    initialize.addHangXes();
    initialize.addPhiVanChuyen();
    initialize.addAdminAccount();
  })
  .catch((err) => {
    console.error('Lỗi đồng bộ hóa cơ sở dữ liệu:', err);
  });


const PORT = 8080;
app.listen(PORT, () => {
    console.log("Server is running in port:  " + PORT)
})