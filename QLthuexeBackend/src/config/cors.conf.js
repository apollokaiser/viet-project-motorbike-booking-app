import cors from "cors";

const corsConfig = (app) =>{
    app.use(cors({
        origin: "http://localhost:5173",
        allowedHeaders:"*",
        methods:['GET','POST','PUT','DELETE']
    }))
}

export default corsConfig;