import HangXeService from '../service/hangXe.service.js';
import express from 'express';
const router = express.Router();
//only admin routes
router.post('/them-hang-xe', HangXeService.addHangXe);
router.delete('/xoa-hang-xe',HangXeService.deleteHangXe);
router.put('/cap-nhat-hang-xe', HangXeService.updateHangXe);

//public routes
router.get('/get-hang-xe',HangXeService.getAllHangXe);

export default router;