import axios from "axios";

const API_KEY = import.meta.env.VITE_FPT_API_KEY;
export default axios.create({
    baseURL: " https://api.fpt.ai/vision",
    headers:{
        "Content-Type": "multipart/form-data",
        "api_key":API_KEY
    }
})