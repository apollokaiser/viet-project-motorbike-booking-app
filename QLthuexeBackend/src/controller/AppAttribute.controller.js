import express from 'express';

const router = express.Router();
import AppAttributeService from '../service/appAttribute.service.js';
router.get("/get-attributes", AppAttributeService.getAttributes);
router.get("/get-attribute", AppAttributeService.getAttribute);
router.put("/update-attributes", AppAttributeService.updateAttributes);
export default router;