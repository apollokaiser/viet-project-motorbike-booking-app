import express from 'express'
const router = express.Router()
import KhachHangService from '../service/khachhang.service.js'

router.get("/thong-tin", KhachHangService.getUserInfo)
router.post("/cap-nhat-thong-tin", KhachHangService.updateCustomerInfo)

export default router;