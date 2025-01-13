import express from "express";
const router = express.Router();
import authentication, { authorizationAdmin } from "../middleware/authentication.js";
import authRouter from "../controller/Auth.controller.js";
import XeRouter from "../controller/Xe.controller.js";
import LoaiXeRouter from "../controller/LoaiXe.controller.js";
import CartRouter from "../controller/Cart.controller.js";
import PaymentRouter from "../controller/Payment.controller.js";
import VanChuyenRouter from "../controller/VanChuyen.controller.js";
import KhachHangRouter from "../controller/KhachHang.controller.js";
import AdminRouter from "../controller/Admin.controller.js";
import ThueXeRouter from "../controller/ThueXe.controller.js";

import HangXeRouter from "../controller/HangXe.controller.js";
import { ResponseMessage } from "../payload/ResponseMessage.js";

const routes = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/xe', XeRouter)
    app.use('/api/loai-xe', LoaiXeRouter)
    app.use('/api/hang-xe', HangXeRouter)
    app.use('/api/gio-hang', CartRouter)
    app.use("/api/thanh-toan", PaymentRouter)
    app.use("/api/van-chuyen", VanChuyenRouter)
    app.use("/api/khach-hang", authentication, KhachHangRouter)
    app.use("/api/don-hang", authentication, ThueXeRouter)
    app.use("/api/admin", authentication, authorizationAdmin, AdminRouter)

    app.use((err, req, res, next) => {
        console.error(err);
        res.status(200).send(new ResponseMessage("Something went wrong", 500));
    })
}
export default routes;