import axios from "axios";


 const instance = axios.create({
    baseURL: "http://localhost:8080/api/",
})
instance.interceptors.request.use((config) =>{
    const token = localStorage.getItem("jwt");
    if (token) {
        instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return config;
})
export default instance;

