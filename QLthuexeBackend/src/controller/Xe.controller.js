import XeService from "../service/xe.service.js";
import express from 'express';
const router = express.Router();


router.get('/get-xe', XeService.getXe)
router.get('/tim-kiem-xe', XeService.searchXe)
router.post('/add-xe', XeService.addXe)
router.get('', XeService.getALLXe)


export default router;