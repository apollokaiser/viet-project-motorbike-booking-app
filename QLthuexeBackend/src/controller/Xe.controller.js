import XeService from "../service/xe.service.js";
import express from 'express';
const router = express.Router();

// http://localhost:8080/api/admin/xe/*
router.get("/load-bike-status", XeService.getBikeStatus)
router.get("/get-all-bikes-data", XeService.getAllXeData)
router.delete("/delete-bike", XeService.deleteXe)
router.get("/active-bike", XeService.activeXe)
router.put("/cap-nhat-xe", XeService.updateXe)
router.get("/get-bien-so-xe", XeService.getAllBienSoXeByXeId)
router.delete("/xoa-bien-so-xe", XeService.deleteBienSoXe)
router.get("/active-bien-so-xe", XeService.activeBienSoXe)
router.post("/them-bien-so-xe", XeService.addBienSoXe)

// http://localhost:8080/api/xe/*
router.get('/get-xe', XeService.getXe)
router.get('/related-products', XeService.getRelatedBikes)
router.get('/tim-kiem-xe', XeService.searchXe)
router.post('/add-xe', XeService.addXe)
router.get('', XeService.getALLXe)


export default router;