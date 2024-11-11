import loaiXe from "../models/loaixe.js";

export class LoaiXeService {
   static async getAllLoaiXe(req,res) {
    try {
        const categories = await loaiXe.findAll();
        if(categories && categories.length > 0) {
            return res.status(200).send({
                status: 200,
                data: categories
            })
        } else {
            return res.status(201).send({
                status: 404,
                message: "No Loai Xe found"
            })
        }
    } catch (error) {
        return res.status(500).send({
            status: 201,
            message: "Error retrieving loai Xe",
            error
        })
    }
        
    }
}