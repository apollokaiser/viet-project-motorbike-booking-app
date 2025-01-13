import hinhAnh from "../models/hinhanh.js";
import Xe from "../models/xe.js";
import bienSoXe from "../models/biensoxe.js";
import { ResponseMessage, ResponseBody } from "../payload/ResponseMessage.js"
export default class CartService {

    static async getCarts(req, res) {
        const { carts } = req.body;
        try {
            const result = await Xe.findAll({
                where: {
                    ma_xe: carts,
                },
                attributes: ['ma_xe', 'ten_xe', 'gia_thue',"co_san","the_chan"],
                include: [{
                    model: hinhAnh,
                    as: 'hinhAnhs',
                    attributes: ["url"]
                },
                {
                    model: bienSoXe,
                    as: 'bienSoXes',
                }]
            })
            res.status(200).send(new ResponseBody("Get cart items successfully", result));
        } catch (error) {
            return res.status(200).send(new ResponseMessage("Error", 400));
        }
    }
}