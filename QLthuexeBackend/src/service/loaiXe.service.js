import loaiXe from "../models/loaixe.js";
import Utils from "../utils/utils.js"
import { ResponseMessage, ResponseBody } from "../payload/ResponseMessage.js"
import Exception from "../payload/Exception.js"
export class LoaiXeService {
    static async getAllLoaiXe(req, res) {
        try {
            const categories = await loaiXe.findAll();
            if (categories && categories.length > 0) {
                return res.status(200).send(new ResponseBody("Success", categories))
            } else {
                return res.status(201).send(new ResponseMessage("Not found", 400));
            }
        } catch (error) {
            return res.status(500).send(new ResponseMessage("Error", 400));
        }

    }
    static async addLoaiXe(req, res) {
        try {
            const category = req.body;
            if (!category?.ten_loai) throw new Exception("Tên loại không khả dụng");
            if (category?.ma_loai == "") {
                category.ma_loai = Utils.formatUTF8(category.ten_loai);
            }
            const newCategory = await loaiXe.create(category)
            if (!newCategory) return res.status(200).send(new ResponseMessage("Not found", 400));
            return res.status(200).send(new ResponseBody("get categories successfully", category))
        } catch (error) {
            console.log(error);
            return res.status(200).send(new ResponseMessage("Error", 400));
        }
    }
    static async deleteLoaiXe(req, res) {
        try {
            const { id } = req.query;
            if (!id) throw new Exception("Mã loại xe không khả dụng");
            const result = await loaiXe.destroy({
                where: {
                    ma_loai: id
                }
            })
            if (!result) return res.status(200).send(new ResponseMessage("Delete failed", 400));
            return res.status(200).send(new ResponseMessage("Deleted", 200));
        } catch (error) {
            return res.status(200).send(new ResponseMessage("Error", 400));
        }
    }
    static async updateLoaiXe(req, res) {
        try {
            const { id, ten_loai } = req.body;
            if (!ten_loai) throw new Error("Tên loại xe không khả dụng");
            const result = await loaiXe.update({
                ten_loai: ten_loai
            }, {
                where: {
                    ma_loai: id
                }
            })
            if (!result) return res.status(200).send(new ResponseMessage("Update failed", 400));
            return res.status(200).send(new ResponseMessage("Updated successfully", 200));
        } catch (error) {
            return res.status(200).send(new ResponseMessage("Error", 400));
        }
    }
}