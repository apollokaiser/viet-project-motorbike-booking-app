import express from 'express';
const router = express.Router();
import ReportService from "../service/report.service.js"

router.get("/get-report",ReportService.getReport)

export default router;