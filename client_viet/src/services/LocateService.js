import { goongApi, vnapis } from "@/configs/axios";

const API_KEY = import.meta.env.VITE_GOONG_API_KEY;

const client = {
    lat: 10.7502591,
    lng: 106.7137927
}
export const city = {
    province_id:'79',
   province_name:'Thành phố Hồ Chí Minh'
}
export default class LocateService {
    static checkAddressDistance = async (address) => {
        try {
            const result = await goongApi.get(`/geocode?address=${address}&api_key=${API_KEY}`)
            if (result.data.results.length > 0) {
                const distance = await LocateService.getDistance(result.data.results[0].geometry.location);
                return distance;
            }
            else throw new Error("No results found");
        } catch (error) {
            console.log(error);
            return 0;
        }
    }
    static getDistance = async ({ lat, lng }) => {
        try {
            const result = await goongApi.get(`/DistanceMatrix?origins=${client.lat},${client.lng}&destinations=${lat},${lng}&vehicle=bike&api_key=${API_KEY}`)
            if (result.data.rows) {
                const value = result.data.rows[0].elements[0].distance.text;
                return value.split(" ")[0];
            }
            else throw new Error("Error getting distance");
        } catch (error) {
            return 0;
        }
    }
    static getProvince = async () => {
        try {
            const result = await vnapis.get('/province/');
            return result.data.results;
        } catch (error) {
            return [];
        }
    }
    static getDistrict = async (province_id) => {
        try {
            const result = await vnapis.get(`/province/district/${province_id}`);
            return result.data.results;
        } catch (error) {
            return [];
        }
    }
    static getWard = async (district_id) => {
        try {
            const result = await vnapis.get(`/province/ward/${district_id}`);
            return result.data.results;
        } catch (error) {
            return [];
        }
    }
}