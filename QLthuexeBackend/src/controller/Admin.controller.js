import express from 'express';
const router = express.Router();

import PaymentRouter from "../controller/Payment.controller.js";
import ThueXeRouter from '../controller/ThueXe.controller.js';
import XeRouter from "../controller/Xe.controller.js"
import PhiPhatRouter from './PhiPhat.controller.js';
import LoaiXeRouter from './LoaiXe.controller.js';
import HangXeRouter from './HangXe.controller.js';
import ReportRouter from "./Report.controller.js";
import AppAttributeRouter from "./AppAttribute.controller.js";

router.use("/xe", XeRouter);
router.use("/payment", PaymentRouter);
router.use("/don-hang", ThueXeRouter);
router.use("/danh-muc", LoaiXeRouter);
router.use("/hang-xe", HangXeRouter);
router.use("/phi-phat", PhiPhatRouter);
router.use("/bao-cao", ReportRouter);
router.use("/settings",AppAttributeRouter);

export default router;