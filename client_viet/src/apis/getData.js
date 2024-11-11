import axios from "@/configs/axios";


export const getAllLoaiXe = async() =>{
    try {
        const response = await axios.get("/loai-xe/get-loai-xe");
        return response.data;
    } catch (error) {
        console.error("getAllLoaiXe failed: " + error);
        return [];
    }
} 
export const getAllXe = async(loaiXe="XS") =>{
    try {
        const response = await axios.get(`/xe?category=${loaiXe}`);
        return response.data;
    } catch (error) {
        console.error("getAllXe failed: " + error);
        return [];
    }
}
export const getXe = async(ma_xe) =>{
    try {
        const response = await axios.get(`/xe/get-xe?id=${ma_xe}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("getAllXe failed: " + error);
        return null;
    }
}