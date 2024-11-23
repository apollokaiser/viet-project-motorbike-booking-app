import axios from "axios";

const GOONG_HOST = import.meta.env.VITE_GOONG_URL;
const API_KEY = import.meta.env.VITE_GOONG_API_KEY;
const instance = axios.create({
    baseURL: GOONG_HOST,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})
const client = {
    lat:10.7502591,
    lng:106.7137927
}
export const checkAddressDistance = async (address) => {
    try {
        const result = await instance.get(`/geocode?address=${address}&api_key=${API_KEY}`)
        if (result.data.results.length > 0) {
            const distance = await getDistance(result.data.results[0].geometry.location);
            return distance;
        }
        else throw new Error("No results found");
    } catch (error) {
        return 0;
    }
}
export const getDistance = async ({ lat, lng }) => {
    try {
        const result = await instance.get(`/DistanceMatrix?origins=${client.lat},${client.lng}&destinations=${lat},${lng}&vehicle=bike&api_key=${API_KEY}`)
        if (result.data.rows) {
            const value = result.data.rows[0].elements[0].distance.text;
            return value.split(" ")[0];
        }
        else throw new Error("Error getting distance");
    } catch (error) {
        console.log(error);
        return 0;
    }
}