import express from "express";
const router = express.Router();
import authentication from "../middleware/authentication.js";
import authRouter from "../controller/Auth.controller.js";
import XeRouter from "../controller/Xe.controller.js";
import LoaiXeRouter from "../controller/LoaiXe.controller.js";
import CartRouter from "../controller/Cart.controller.js";
import PaymentRouter from "../controller/Payment.controller.js";
import VanChuyenRouter from "../controller/VanChuyen.controller.js";
import KhachHangRouter from "../controller/KhachHang.controller.js";

const routes = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/xe', XeRouter)
    app.use('/api/loai-xe', LoaiXeRouter)
    app.use('/api/gio-hang', CartRouter)
    app.use("/api/thanh-toan", PaymentRouter)
    app.use("/api/van-chuyen", VanChuyenRouter)
    app.use("/api/khach-hang",authentication, KhachHangRouter)
}
export default routes;