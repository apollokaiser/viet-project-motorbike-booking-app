import express from 'express';
const router = express.Router();
import { loginWithGoogle, loginWithAdminAccount } from '../service/auth.service.js';
import 'dotenv/config'


router.post('/login/google', loginWithGoogle)
router.post('/login/admin',loginWithAdminAccount)
export default router;