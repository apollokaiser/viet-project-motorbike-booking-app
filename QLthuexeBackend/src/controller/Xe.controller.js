import XeService from "../service/xe.service.js";
import express from 'express';
const router = express.Router();


router.get('/', XeService.getALLXe)


export default router;