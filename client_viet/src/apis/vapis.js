import axios from "axios"

const vnapis = axios.create({
    baseURL: "https://vapi.vnappmob.com/api",
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

export const getProvince = async () => {
    try {
        const result = await vnapis.get('/province/');
        console.log(result);
        return result.data.results;
    } catch (error) {
        console.log(error);
        return [];
    }
}
export const getDistrict = async (province_id) => {
    try {
        const result = await vnapis.get(`/province/district/${province_id}`);
        return result.data.results;
    } catch (error) {
        return [];
    }
}
export const getWard = async (district_id) => {
    try {
        const result = await vnapis.get(`/province/ward/${district_id}`);
        return result.data.results;
    } catch (error) {
        return [];
    }
}