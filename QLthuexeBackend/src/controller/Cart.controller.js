
import CartService  from "../service/cart.service.js"; 
import express from "express";
const router = express.Router();


router.post('/get-cart', CartService.getCarts)


export default router;