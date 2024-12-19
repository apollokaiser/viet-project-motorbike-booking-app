import Xe from "../models/xe.js";
import hinhAnh from "../models/hinhanh.js";
import Utils from "../utils/utils.js"
import { ResponseMessage, ResponseBody } from "./payload/ResponseMessage.js"
import { sequelize } from "../models/index.js";
import ProductStatistic from "./payload/ProductStatistic.js";
import loaiXe from "../models/loaixe.js";
import hangXe from "../models/hangxe.js";
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
                },
                attributes: ["ma_xe", "ten_xe", "gia_thue"]
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
    static async getAllXeData(req, res) {
        try {
            const { status, category } = req.query;
            let condition = status == true || status == false ? { tinh_trang_xe: status, ma_loai: category } : undefined;
            if (!category) delete condition.ma_loai;
            const xe = await Xe.findAll({
                where: condition,
                include: [
                    {
                        model: hinhAnh,
                        as: "hinhAnhs",
                        attributes: ["url"]
                    },
                    {
                        model: loaiXe,
                        as: "category",
                        attributes: ["ten_loai"]
                    },
                    {
                        model: hangXe,
                        as: "brand",
                        attributes: ["ten_hang"]
                    }
                ],
                attributes: {
                    exclude: ["createdAt", "updatedAt", "ma_loai", "ma_hang"]
                }
            })
            if (xe.length) {
                delete xe.category;
                delete xe.brand;
                return res.status(200).send({
                    status: 200,
                    data: xe
                });
            } else {
                return res.status(200).send({
                    status: 404,
                    message: "No xe found"
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
            if (bikes.length > 100) return res.status(200).send({
                status: 400,
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
            const { check } = req.query;
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
    static async deleteXe(req, res) {
        try {
            const { id, mode } = req.query;
            console.log(id, mode);
            if (!id) throw new Error("Invalid params");
            if (mode == 1) return await XeService.disableXe(req, res);
            const xe = await Xe.destroy({
                where: { ma_xe: id }
            });
            if (!xe)
                return res.status(200).send(new ResponseMessage("No bike found", 404));
            return res.status(200).send(new ResponseMessage("Delete bike successfully", 200));
        } catch (error) {
            console.log(error);
            return res.status(200).send(new ResponseMessage("error", 400));
        }
    }
    static async disableXe(req, res) {
        const { id } = req.query;
        const xe = await Xe.update({
            tinh_trang_xe: false,
        }, {
            where: { ma_xe: id }
        })
        if (!xe)
            return res.status(200).send(new ResponseMessage("Cannot disable bike", 404));
        return res.status(200).send(new ResponseMessage("Delete bike successfully", 200));
    }

    static async getRelatedProducts(req, res) {
        const { category, brand } = req.query;
        try {
            const result = await Xe.findAll({
                where: {
                    ma_loai: category,
                    ma_hang: brand
                },
                limit: 3,
                include: [{ model: hinhAnh, as: 'hinhAnhs', attributes: ["url"] }],
                attributes: ["ma_xe", "ten_xe", "gia_thue"]
            })
            return res.status(200).send(new ResponseBody("Get related products successfully", result));
        } catch (error) {
            console.log(error);
            return res.status(200).send(new ResponseMessage("error", 400));
        }
    }
    static async getBikeStatus(req, res) {
        try {
            const result = await sequelize.query("call load_bike_status()");
            if (!result)
                return res.status(200).send(new ResponseMessage("No data found", 404));
            // result[0] = {total: ..., rented: ...,}
            const data = new ProductStatistic(result[0]?.total, result[0]?.rented).getData();
            return res.status(200).send(new ResponseBody("Get bike status successfully", data));
        } catch (error) {
            console.log(error);
            return res.status(200).send(new ResponseMessage("error", 400));
        }
    }
    static async activeBike(req, res) {
        try {
            const { id } = req.query;
            console.log(id);
            const xe = await Xe.update({
                tinh_trang_xe: true,
            }, {
                where: { ma_xe: id }
            })
            if (!xe) {
                return res.status(200).send(new ResponseMessage("Cannot active bike", 404));
            }
            return res.status(200).send(new ResponseMessage("Active bike successfully", 200));
        } catch (error) {
            console.log(error);
            return res.status(200).send(new ResponseMessage("error", 400));
        }
    }
}

export default XeService