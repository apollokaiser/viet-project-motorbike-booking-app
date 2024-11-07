import express from 'express';
const router = express.Router();
import khachHangservice from '../service/khachhang.service.js';
import userRoute from './user';
import AdminRoute from './admin';

//http://localhost:3567/api/user

router.use('./user',khachHangservice);
router.use('./admin',);


