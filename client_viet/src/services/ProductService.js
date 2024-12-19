import axios from "@/configs/axios";
import { adminApi } from "@/configs/axios";
import uploadImages from "@utils/uploadImage";

export default class ProductService {

    static getAllBikes = async (loaiXe = "TG") => {
        try {
            const response = await axios.get(`/xe?category=${loaiXe}`);
            return response.data;
        } catch (error) {
            return [];
        }
    }
    static getBike = async (id) => {
        try {
            const response = await axios.get(`/xe/get-xe?id=${id}`);
            return response.data;
        } catch (error) {
            console.error("getAllXe failed: " + error);
            return null;
        }
    }
    static getRelatedProduct = async (category, brand) => {
        try {
            const response = await axios.get(`/xe/related-products?category=${category}&brand=${brand}`);
            return response.data;
        } catch (error) {
            return [];
        }
    }
    static getProductStatus = async () => {
        try {
            const response = await adminApi.get(`/xe/load-bike-status`);
            if (response.status === 200)
                return response.data.data;
        } catch (error) {
            return null;
        }
    }
    static getAllBikeDatas = async (status = "all", category = null) => {
        try {
            const response = await adminApi.get(`/xe/get-all-bikes-data?category=${category}&status=${status}`);
            return response.data.status == 200 ? response.data.data : null;
        } catch (error) {
            return null;
        }
    }
    static uploadAndAddBikes = async (bikes) => {
        try {
            const updatedBikes = await Promise.all(
                bikes.map(async(bike) => {
                    const secureUrl = await uploadImages(bike.image);
                    return { ...bike, image: secureUrl };
                }))
            const result = await axios.post('/xe/add-xe',{
                bikes
            })
            return result.status == 200? true : false;
        } catch (error) {
            return null;
        }

    }
    /**
     * 
     * @param {String} id 
     * @param {Number(1,0) } mode = 0, xóa vĩnh viễn, mode = 1, tạm dừng thuê (soft delete)
     * @returns true nếu thành công, ngược lại trả về null
     */
    static deleteBike = async (id, mode = 1) => {
        try {
            const response = await adminApi.delete(`/xe/delete-bike?id=${id}&mode=${mode}`);
            return response.data.status == 200 ? true : null;
        } catch (error) {
            return null;
        }
    }
    static activeProduct = async (id) => {
        try {
            const response = await adminApi.get(`/xe/active-bike?id=${id}`);
            console.log(response);
            return response.data.status == 200 ? true : null;
        } catch (error) {
            return null;
        }
    }
}