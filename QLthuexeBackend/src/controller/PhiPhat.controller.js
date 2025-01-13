import express from 'express';
const router = express.Router();
import PhiPhatService from '../service/phiPhat.service.js';

router.get("/get-all-fines", PhiPhatService.getAllPhiPhat);

export default router;