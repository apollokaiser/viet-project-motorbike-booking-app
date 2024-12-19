import express from 'express';
const router = express.Router();
import ThueXeService from '../service/payment.service.js';
import authentication from '../middleware/authentication.js';

//admin
router.get("/update-order-status", ThueXeService.updateOrderStatus)

//user 
router.get("/vnpay_return", ThueXeService.thanhToanOnline)
router.post('',authentication, ThueXeService.thanhToan)
router.post('/online-bank',authentication, ThueXeService.redirectToVnPay)



export default router