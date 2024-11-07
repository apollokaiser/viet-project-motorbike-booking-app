import express from "express";
const router = express.Router();
import authRouter from "../controller/auth.controller.js";
import XeRouter from "../controller/Xe.controller.js"; 
const routes = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/xe', XeRouter)
}
export default routes;