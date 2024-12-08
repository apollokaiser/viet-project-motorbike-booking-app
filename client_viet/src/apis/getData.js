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
        return response.data;
    } catch (error) {
        console.error("getAllXe failed: " + error);
        return null;
    }
}
export const getCartDetails = async(cartItems) =>{
    if(cartItems.length ==0) return [];
    try {
        const cartItemIds = cartItems.map(item=> item.id);
        const response = await axios.post("/gio-hang/get-cart", {carts:cartItemIds});
        return response.data;
    } catch (error) {
        console.error("getAllXe failed: " + error);
        return [];
    }
}
export const getPhiVanChuyen = async() =>{
    try {
        const response = await axios.get("/van-chuyen");
        return response.data;
    } catch (error) {
        return [];
    }
}
export const getRelatedProduct = async(category, brand) =>{
    try {
        const response = await axios.get(`/xe/related-products?category=${category}&brand=${brand}`);
        return response.data;
    } catch (error) {
        return [];
    }
}
export const getUserInfo = async(id) =>{
    try {
        const response = await axios.get(`/khach-hang/thong-tin?id=${id}`);
        return response.data;
    } catch (error) {
        return {};
    }
}