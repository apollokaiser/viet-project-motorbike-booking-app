import express from 'express';
import passport from 'passport';
const router = express.Router();
import khachHang from '../models/models/khachhang.js';
import khachHangservice from '../service/khachhang.service.js';
router.get('/google',
    passport.authenticate('google', { scope: ['profile'], session: false }));

router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', (err, profile) => {
        req.user = profile
        next()
    })(req, res, next)

}, (req, res) => {
    res.redirect(`${process.env.URL_CLIENT}/login_success/${req.user?.id}`)
})

router.post('/login-success', khachHangservice.loginSuccess)
export default router;