import { LoaiXeService } from "../service/loaiXe.service.js";
import express from 'express';
const router = express.Router();

router.get('/get-loai-xe',LoaiXeService.getAllLoaiXe);
router.post('/them-loai-xe',LoaiXeService.addLoaiXe);
router.delete('/xoa-loai-xe',LoaiXeService.deleteLoaiXe);
router.put('/cap-nhat-loai-xe', LoaiXeService.updateLoaiXe);

export default router;