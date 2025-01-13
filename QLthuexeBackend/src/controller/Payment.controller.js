import express from 'express';
const router = express.Router();
import PaymentService from '../service/payment.service.js';
import ThueXeSerivce from '../service/thueXe.service.js';
import authentication from '../middleware/authentication.js';

//admin
router.get("/update-order-status", PaymentService.updateOrderStatus)

//user 
router.get("/phuong-thuc-thanh-toan", ThueXeSerivce.getPaymentMethods)
router.get("/vnpay_return", PaymentService.thanhToanOnline)
router.post('',authentication, PaymentService.thanhToan)
router.post('/online-bank',authentication, PaymentService.redirectToVnPay)



export default router