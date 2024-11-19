import express from 'express'
import VanChuyenService from '../service/vanChuyen.service.js';

const router = express.Router();

router.get("/", VanChuyenService.getPhiVanChuyen);

export default router;