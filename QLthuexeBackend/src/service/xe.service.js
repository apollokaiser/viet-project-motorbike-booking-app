import Xe from "../models/xe.js";
import hinhAnh from "../models/hinhanh.js";
import Utils from "../utils/utils.js"
class XeService {
    static async getALLXe(req, res) {
        try {
            const loaiXe = req.query?.category?.toLowerCase();
            const xe = await Xe.findAll({
                where: {
                    tinh_trang_xe: true,
                    ma_loai: loaiXe || "XS"
                },
                include: {
                    model: hinhAnh,
                    as: "hinhAnhs",
                    attributes: ["url"]
                }
            });

            if (xe) {
                return res.status(200).send({
                    status: 200,
                    data: xe
                });
            } else {
                return res.status(404).send({
                    status: 404,
                    message: "No xe found"
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                status: 500,
                message: "Internal Server Error"
            });
        }
    }
    static async getXe(req, res) {
        try {
            const id = req.query?.id;
            const xe = await Xe.findOne({
                where: { ma_xe: id },
                include: {
                    model: hinhAnh,
                    as: "hinhAnhs",
                    attributes: ["url"]
                }
            });
            if (xe) {
                return res.status(200).send({
                    status: 200,
                    data: xe
                });
            } else {
                return res.status(404).send({
                    status: 404,
                    message: "No xe found"
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                status: 500,
                message: "Internal Server Error"
            });
        }
    }
    static async addXe(req, res) {
        try {
            const { bikes } = req.body;
            if(bikes.lenght >100) return res.status(200).send({
                status:400,
                msg: 'Over 100 data once per request '
            });
            const bikesData = bikes.map(bike => {
                let maxe = Utils.createMaXe(bike["Danh mục"])
                return {
                    ma_xe: maxe,
                    bien_so: bike["Biển số xe"],
                    ten_xe: bike["Tên xe"],
                    tinh_trang_xe: true,
                    phan_khoi: bike["Phân khối"],
                    gia_thue: bike["Giá thuê"],
                    mo_ta: bike["Mô tả"],
                    so_luong: bike["Số lượng"],
                    xe_ton_khoi: bike["Số lượng"],
                    ma_loai: bike["Danh mục"],  // ID của loại xe
                    ma_hang: bike["Hãng"],   // ID của hãng xe
                    hinhAnhs: bike["image"] ? [{
                        url: bike["image"],
                        ma_xe: maxe
                    }] : []
                }
            })
            console.log(bikesData);
            await Xe.bulkCreate(bikesData, {
                include: [{ model: hinhAnh, as: 'hinhAnhs' }],
                validate: true,
                ignoreDuplicates: true,

            })
            return res.status(200).send({
                status: 200,
                message: "Thêm xe thành công"
            });
        } catch (error) {
            console.log(error);
            return res.status(400).send({
                status: 400,
                message: "Không thể thêm"
            });
        }
    }
    static async searchXe(req, res) {
        try {
            const {check} = req.query;
            const result = await Xe.findAll({
                where: {
                    loai_xe: check.loai_xe,
                    hang_xe: check.hang_xe
                },
            });
            if (result) {
                res.status(200).send({
                    status: 200,
                    message: 'success',
                    data: result
                });
            }
        }
        catch (err) {
            return res.status(200).send({
                status: 401,
                data: null,
                message: 'error'
            });

        }
    }
}

export default XeService