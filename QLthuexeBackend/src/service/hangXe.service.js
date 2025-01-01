import hangXe from "../models/hangxe.js";
import Utils from "../utils/utils.js";
import { ResponseMessage, ResponseBody } from "../payload/ResponseMessage.js"
import Exception from "../payload/Exception.js"

class HangXeService {
    static async getAllHangXe(req, res) {
        try {
            const brand = await hangXe.findAll();
            return res.status(200).send(new ResponseBody("Get brand successfully", brand));
        } catch (error) {
            return res.status(200).send(new ResponseMessage("Error", 400));
        }
    }
    static async addHangXe(req, res) {
        try {
            const brand = req.body;
            if (!brand?.ten_hang) throw new Exception("Tên hãng là bắt buộc");
            if (brand?.ma_hang == "") {
                brand.ma_hang = Utils.formatUTF8(brand.ten_hang);
            }
            const newBrand = await hangXe.create(brand);
            if (!newBrand) throw new Exception("Thêm không thành công !");
            return res.status(200).send(new ResponseBody("Created", brand));
        } catch (error) {
            return res.status(200).send(Exception.sendError(error, "Thêm không thành công"));
        }
    }
    static async deleteHangXe(req, res) {
        try {
            const { id } = req.query;
            if (!id) throw new Exception("Mã xe không khả dụng");
            const result = await hangXe.destroy({
                where: {
                    ma_hang: id
                }
            })
            if (!result) {
                return res.status(200).send(new ResponseMessage("Lỗi khi xóa !", 400));
            }
            return res.status(200).send(new ResponseMessage("Deleted", 200));
        } catch (error) {
            console.error(error);
            return res.status(200).send(new ResponseMessage("error",400));
        }
    }
    static async updateHangXe(req, res) {
        try {
            const { id, ten_hang } = req.body;
            if (!ten_hang) throw new Error("Invalid ten_hang");
            const result = await hangXe.update({
                ten_hang: ten_hang
            }, {
                where: {
                    ma_hang: id
                }
            })
            if (!result) {
                return res.status(200).send(new ResponseMessage("Không thể cập nhật", 400));
            }
            return res.status(200).send(new ResponseMessage("Cập nhật thành công", 200));
        } catch (error) {
            console.error(error);
            return res.status(200).send(new ResponseMessage("Không thể cập nhật", 400));
        }
    }

}
export default HangXeService;