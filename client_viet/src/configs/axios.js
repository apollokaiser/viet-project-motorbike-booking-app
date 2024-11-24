import axios from "axios";


 const instance = axios.create({
    baseURL: "http://localhost:8080/api/",
})
instance.interceptors.request.use((config) =>{
    const token = localStorage.getItem("jwt");
    if (token) {
        config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
    }
    return config;
})
export default instance;

