import { LoaiXeService } from "../service/loaiXe.service.js";
import express from 'express';
const router = express.Router();

router.get('/get-loai-xe',LoaiXeService.getAllLoaiXe);

export default router;