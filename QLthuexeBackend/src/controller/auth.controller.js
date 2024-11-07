import express from 'express';
const router = express.Router();
import { loginWithGoogle } from '../service/auth.service.js';
import 'dotenv/config'


router.post('/login/google', loginWithGoogle)
export default router;