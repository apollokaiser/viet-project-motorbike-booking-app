import axios from "@/configs/axios";

export default class CartService {
    static async getCartDetails(cartItems) {
        if (cartItems.length == 0) return [];
        try {
            const cartItemIds = cartItems.map(item => item.id);
            const response = await axios.post("/gio-hang/get-cart", { carts: cartItemIds });
            return response.data;
        } catch (error) {
            return [];
        }
    }
}