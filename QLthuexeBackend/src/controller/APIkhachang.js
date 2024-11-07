import express from 'express';
const router = express.Router();
import khachHangservice from '../service/khachhang.service.js';
router.post('/login',khachHangservice.login);
router.get('/search-xe',khachHangservice.searchXe);
