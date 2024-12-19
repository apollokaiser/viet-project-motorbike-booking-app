import hangXe from "../models/hangxe.js";
import Utils from "../utils/utils.js";


class HangXeService {
    static async getAllHangXe(req, res) {
        try {
            const brand = await hangXe.findAll();
            if (brand) {
                return res.status(200).send({
                    status: 200,
                    data: brand
                });
            } else {
                return res.status(200).send({
                    status: 404,
                    message: "No hangXe found"
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(200).send({
                status: 500,
                message: "Internal Server Error"
            });
        }
    }
    static async addHangXe(req, res) {
        try {
            const brand = req.body;
            if (!brand?.ten_hang) throw new Error("Ten hang is required");
            if (brand?.ma_hang == "") {
                brand.ma_hang = Utils.formatUTF8(brand.ten_hang);
            }
            const newBrand = await hangXe.create(brand);
            if (!newBrand) {
                return res.status(200).send({
                    status: 400,
                    message: "Error adding new hangXe"
                });
            }
            return res.status(200).send({
                status: 200,
                message: "Add hangXe successfully",
                data: brand
            });
        } catch (error) {
            console.error(error);
            return res.status(200).send({
                status: 500,
                message: "Internal Server Error"
            });
        }
    }
    static async deleteHangXe(req, res) {
        try {
            const { id } = req.query;
            if (!id) throw new Error("Invalid id");
            const result = await hangXe.destroy({
                where: {
                    ma_hang: id
                }
            })
            if (!result) {
                return res.status(200).send({
                    status: 400,
                    message: "Error adding new hangXe"
                });
            }
            return res.status(200).send({
                status: 200,
                message: "Delete hangXe successfully"
            });
        } catch (error) {
            console.error(error);
            return res.status(200).send({
                status: 500,
                message: "Internal Server Error"
            });
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
                return res.status(200).send({
                    status: 400,
                    message: "Error update hangXe"
                });
            }
            return res.status(200).send({
                status: 200,
                message: "Update hangXe successfully"
            });
        } catch (error) {
            console.error(error);
            return res.status(200).send({
                status: 500,
                message: "Internal Server Error"
            });
        }
    }

}
export default HangXeService;