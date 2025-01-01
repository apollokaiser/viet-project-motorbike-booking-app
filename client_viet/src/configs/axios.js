import axios from "axios";

const GOONG_HOST = import.meta.env.VITE_GOONG_URL;
const API_KEY = import.meta.env.VITE_FPT_API_KEY;

const webApi = axios.create({
    baseURL: "http://localhost:8080/api/",
    headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
    }
})
const adminApi = axios.create({
    baseURL: "http://localhost:8080/api/admin/",
})
const goongApi = axios.create({
    baseURL: GOONG_HOST,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});
const verifyCardApi = axios.create({
    baseURL: " https://api.fpt.ai/vision",
    headers: {
        "Content-Type": "multipart/form-data",
        "api_key": API_KEY
    }
})
const vnapis = axios.create({
    baseURL: "https://vapi.vnappmob.com/api/v2",
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

webApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
        config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
    }
    return config;
})

adminApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt_admin");
    if (token) {
        config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
    }
    return config;
});

export { adminApi, goongApi, vnapis, verifyCardApi };
export default webApi;

