import express from "express";
import comfigViewEngine from "./comfig/viewEngine.js";
import initWebRoutes from "./routers/web.js";
import connection from "./comfig/connectDB.js";
import cors from "cors";
import router from "./controller/auth.js";
const app = express();
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
}))
app.use(express.urlencoded({ extended: true }))
app.use('/api/auth',router)
comfigViewEngine(app);
//test connection
connection();

initWebRoutes(app);

const PORT = 8080;
app.listen(PORT, () => {
    console.log("chay duoc nha" + PORT);
})