import express from 'express';
const router = express.Router();
import XeRouter from "../controller/Xe.controller.js"
import PaymentRouter from "../controller/Payment.controller.js";
import ThueXeRouter from '../controller/ThueXe.controller.js';
import LoaiXeRouter from './LoaiXe.controller.js';
import HangXeRouter from './HangXe.controller.js';
router.use("/xe", XeRouter)
router.use("/payment", PaymentRouter);
router.use("/don-hang", ThueXeRouter);
router.use("/danh-muc", LoaiXeRouter);
router.use("/hang-xe", HangXeRouter);

export default router;