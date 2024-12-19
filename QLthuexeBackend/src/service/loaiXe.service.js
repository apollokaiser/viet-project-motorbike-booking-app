import loaiXe from "../models/loaixe.js";
import Utils from "../utils/utils.js"
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
   static async addLoaiXe(req,res) {
    try {
        const category = req.body;
        console.log(category);
            if (!category?.ten_loai) throw new Error("Ten loai is required");
            if(category?.ma_loai=="") {
                category.ma_loai = Utils.formatUTF8(category.ten_loai);
            }
            const newCategory = await loaiXe.create(category)
            if(!newCategory) throw new Error();
            return res.status(200).send({
                status: 200,
                message: "add category successfully",
                data: category
            })
    } catch (error) {
        console.log(error);
        return res.status(200).send({
            status: 500,
            message: "Error retrieving loai Xe",
            error
        })
    }  
    }
   static async deleteLoaiXe(req,res) {
    try {
        const {id} = req.query;
            if (!id) throw new Error("Invalid id");
            const result = await loaiXe.destroy({
                where: {
                    ma_loai: id
                }
            })
            if(!result) throw new Error();
            return res.status(200).send({
                status: 200,
                message: "delete category successfully"
            })
    } catch (error) {
        console.log(error);
        return res.status(200).send({
            status: 500,
            message: "Error retrieving loai Xe",
            error
        })
    }  
    }
   static async updateLoaiXe(req,res) {
    try {
        const {id,ten_loai} = req.body;
            if (!ten_loai) throw new Error("Invalid ten_loai");
            const result = await loaiXe.update({
                ten_loai: ten_loai
            },{
                where: {
                    ma_loai: id
                }
            })
            if(!result) throw new Error();
            return res.status(200).send({
                status: 200,
                message: "update category successfully"
            })
    } catch (error) {
        console.log(error);
        return res.status(200).send({
            status: 500,
            message: "Error retrieving loai Xe",
            error
        })
    }  
    }
}