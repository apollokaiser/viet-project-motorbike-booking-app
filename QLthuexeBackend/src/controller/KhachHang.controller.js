import express from 'express'
const router = express.Router()
import khachHangService from "../service/khachhang.service.js"

router.post("/cap-nhat-thong-tin", khachHangService.updateCustomerInfo)


export default router;