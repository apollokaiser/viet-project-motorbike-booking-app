import express from "express";
const router = express.Router();
import authRouter from "../controller/auth.controller.js";
const routes = (app) => {
    app.use('/api/auth', authRouter)
}
export default routes;