import express from 'express';
const router = express.Router();
import ThueXeService from '../service/thueXe.service.js';
router.get("/load-status",ThueXeService.getOrderStatus)
router.get("/change-status", ThueXeService.changeOrderStatus)
router.get("/danh-sach-don-hang", ThueXeService.getOrders)

//admin || user can use
router.get("/chi-tiet-don-hang", ThueXeService.getOrderDetail);
export default router;