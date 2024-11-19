import hinhAnh from "../models/hinhanh.js";
import Xe from "../models/xe.js";
export default class CartService {

    static async getCarts(req,res) {
        const {carts} = req.body;
        try {
            const result = await Xe.findAll({
                where:{
                    ma_xe:carts,
                },
                attributes:['ma_xe','ten_xe','gia_thue','so_luong'],
                include:{
                    model:hinhAnh,
                    as:'hinhAnhs',
                    attributes: ["url"]
                }
            })
            if(!result) return res.status(201).send({
                status:404,
                msg:"No cart found",
            })
            res.status(200).send({
                status:200,
                msg:'Success',
                data:result,
            })
        } catch (error) {
            console.log("Get cart failed: " + error);
            return res.status(200).send({
                status:500,
                msg:"Error"
            });
        }
    }
}