import Xe from "../models/xe.js";
import hinhAnh from "../models/hinhanh.js";
import Utils from "../utils/utils.js"
import { ResponseMessage, ResponseBody } from "../payload/ResponseMessage.js"
import Exception from "../payload/Exception.js"
import { Sequelize, sequelize } from "../models/index.js";
import ProductStatistic from "../payload/ProductStatistic.js";
import loaiXe from "../models/loaixe.js";
import hangXe from "../models/hangxe.js";
import { CloudinaryService } from "./cloudinary.service.js";
import bienSoXe from "../models/biensoxe.js";
import { literal } from "sequelize";
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
                return res.status(200).send(new ResponseBody("Get datas successfully", xe));
            }
            return res.status(200).send(new ResponseMessage("Get datas failed"));
        } catch (error) {
            console.error(error);
            return res.status(500).send(new ResponseMessage("Internal Server Error", 500));
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
                    },
                ],
                attributes: {
                    exclude: ["ma_loai", "ma_hang"]
                }
            })
            if (xe.length) {
                delete xe.category;
                delete xe.brand;
                return res.status(200).send(new ResponseBody("Success", xe));
            } else {
                return res.status(200).send(new ResponseMessage("failed", 400));
            }
        } catch (error) {
            return res.status(200).send(new ResponseMessage("error", 400));
        }
    }
    static async getAllBienSoXeByXeId(req, res) {
        try {
            const { id } = req.query;
            const results = await bienSoXe.findAll({
                where: { ma_xe: id }
            });
            if (!results) {
                return res.status(200).send(new ResponseMessage("Get bike failed", 404));
            }
            return res.status(200).send(new ResponseBody("Get bike details successfully", results));
        } catch (error) {
            console.error(error);
            return res.status(200).send(new ResponseMessage("Internal Server Error", 500));
        }
    }
    static async getXe(req, res) {
        try {
            const { id } = req.query;
            const xe = await Xe.findOne({
                where: { ma_xe: id },
                include: [{
                    model: hinhAnh,
                    as: "hinhAnhs",
                    attributes: ["url", "publicId"]
                }, {
                    model: bienSoXe,
                    as: "bienSoXes",
                }],
            });
            if (!xe) {
                return res.status(200).send(new ResponseMessage("Get bike failed", 404));
            }
            return res.status(200).send(new ResponseBody("Get bike details successfully", xe));
        } catch (error) {
            console.error(error);
            return res.status(200).send(new ResponseMessage("Internal Server Error", 500));
        }
    }
    static async addXe(req, res) {
        const transaction = await sequelize.transaction();
        try {
            const { bikes } = req.body;
            if (bikes.length > 50) return res.status(200).send(new ResponseMessage("Over 50 data once per request", 400));
            const bikesData = bikes.map(bike => {
                let maxe = Utils.createMaXe(bike["Danh mục"])
                let bienSoXes = setBikeLicensePlate(bike["Biển số xe"], maxe);
                let hinhAnhs = setBikeImage(bike["image"], maxe);
                return {
                    ma_xe: maxe,
                    ten_xe: bike["Tên xe"],
                    tinh_trang_xe: true,
                    phan_khoi: bike["Phân khối"],
                    gia_thue: bike["Giá thuê"],
                    mo_ta: bike["Mô tả"],
                    co_san: bienSoXes.length,
                    ma_loai: bike["Danh mục"],  // ID của loại xe
                    ma_hang: bike["Hãng"],   // ID của hãng xe
                    bienSoXes,
                    hinhAnhs
                }
            })
            const hinhAnhs = bikesData.flatMap(bike => bike.hinhAnhs)
            const bienSoXes = bikesData.flatMap(bike => bike.bienSoXes);
            await Xe.bulkCreate(bikesData, {
                transaction: transaction,
            })
            await hinhAnh.bulkCreate(hinhAnhs, {
                validate: true,
                ignoreDuplicates: true,
                transaction: transaction
            })
            await XeService.addBienSoXeList(bienSoXes);
            await transaction.commit();
            return res.status(200).send(new ResponseMessage("Thêm xe thành công", 200));
        } catch (error) {
            await transaction.rollback();
            return res.status(200).send(Exception.sendError(error, "Không thể thêm xe"));
        }
    }
    static async addBienSoXeList(bienSoXes) {
        try {
            await bienSoXe.bulkCreate(bienSoXes, {
                transaction: transaction
            });
            return true;
        } catch (error) {
            throw new Exception("Không thể thêm do bị trùng biển số xe");
        }
    }
    static async addBienSoXe(req, res) {
        try {
            const { bienSo } = req.body;
            const transaction = await sequelize.transaction();
            if (!bienSo) throw new Exception("Dữ liệu bị gián đoạn ! Thử lại");
            const existed = await bienSoXe.findOne({
                where: { bien_so: bienSo.bien_so }
            });
            if (existed) {
                throw new Exception(`Biển số xe ${bienSo.bien_so} đã tồn tại`);
            }
            const result = await bienSoXe.create(bienSo);
            Xe.update({
                co_san: literal(`co_san + 1`)
            }, {
                where: { ma_xe: bienSo.ma_xe }
            })
            if (!result) throw new Exception("couldn't create new bien so xe");
            await transaction.commit();
            return res.status(200).send(new ResponseMessage("Thêm biển số xe thành công", 200));
        } catch (error) {
            await transaction.rollback();
           return res.status(200).send(Exception.sendError(error, "Không thể thêm"));
        }
    }
    static async searchXe(req, res) {
        try {
            // FIXME:Xem lại hàm này
            const { search } = req.query;
            const result = await sequelize.query("CALL PROC_SEARCH_VEHICLE(:search)", {
                replacements: { search: `%${search}%` },
                type: Sequelize.QueryTypes.RAW
            })
            if (!result) throw new Error("couldn't find all results");
            return res.status(200).send(new ResponseBody("success", result));
        }
        catch (err) {
            return res.status(200).send(new ResponseBody("error", null, 400));
        }
    }
    static async deleteXe(req, res) {
        try {
            const { id, mode } = req.query;
            if (!id) throw new Error("Invalid params");
            if (mode == 1) return await XeService.disableXe(req, res);
            const result = await Xe.destroy({
                where: { ma_xe: id }
            });
            if (!result)
                return res.status(200).send(new ResponseMessage("No bike found", 404));
            return res.status(200).send(new ResponseMessage("Delete bike successfully", 200));
        } catch (error) {
            console.log(error);
            return res.status(200).send(new ResponseMessage("error", 400));
        }
    }
    static async deleteBienSoXe(req, res) {
        try {
            const { id, mode, ma_xe } = req.query;
            if (!id) throw new Error("Invalid params");
            if (mode == 1) return await XeService.disableBienSoXe(req, res);
            const result = await bienSoXe.destroy({
                where: { bien_so: id }
            });
            Xe.update({
                co_san: literal(`co_san - 1`)
            }, {
                where: { ma_xe: ma_xe }
            })
            if (!result)
                return res.status(200).send(new ResponseMessage("No bike found", 404));
            return res.status(200).send(new ResponseMessage("Delete bike successfully", 200));
        } catch (error) {
            console.log(error);
            return res.status(200).send(new ResponseMessage("error", 400));
        }
    }
    static async disableXe(req, res) {
        const { id, ma_xe } = req.query;
        const xe = await Xe.update({
            tinh_trang_xe: false,
        }, {
            where: { ma_xe: id }
        })
        Xe.update({
            co_san: literal(`co_san - 1`)
        }, {
            where: { ma_xe: ma_xe }
        })
        if (!xe)
            return res.status(200).send(new ResponseMessage("Cannot disable bike", 404));
        return res.status(200).send(new ResponseMessage("Delete bike successfully", 200));
    }
    static async disableBienSoXe(req, res) {
        const { id } = req.query;
        const xe = await bienSoXe.update({
            tinh_trang: false,
        }, {
            where: { bien_so: id }
        })
        if (!xe)
            return res.status(200).send(new ResponseMessage("Cannot disable bike", 404));
        return res.status(200).send(new ResponseMessage("Delete bike successfully", 200));
    }

    static async getRelatedBikes(req, res) {
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
            //FIXME:Xem lại và viết lại load_bike_status
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
    static async activeXe(req, res) {
        try {
            const { id } = req.query;
            const result = await Xe.update({
                tinh_trang_xe: true,
            }, {
                where: { ma_xe: id }
            })
            if (!result) {
                return res.status(200).send(new ResponseMessage("Cannot active bike", 404));
            }
            return res.status(200).send(new ResponseMessage("Active bike successfully", 200));
        } catch (error) {
            console.log(error);
            return res.status(200).send(new ResponseMessage("error", 400));
        }
    }
    static async activeBienSoXe(req, res) {
        try {
            const { id, ma_xe } = req.query;
            const result = await bienSoXe.update({
                tinh_trang: true,
            }, {
                where: { bien_so: id }
            })
            Xe.update({
                co_san: literal(`co_san + 1`)
            }, {
                where: { ma_xe: ma_xe }
            })
            if (!result) {
                return res.status(200).send(new ResponseMessage("Cannot active bike", 404));
            }
            return res.status(200).send(new ResponseMessage("Active bike successfully", 200));
        } catch (error) {
            console.log(error);
            return res.status(200).send(new ResponseMessage("error", 400));
        }
    }
    static async updateXe(req, res) {
        /* NOTE: Hàm này chỉ update xe thôi, còn update biển số xe là không có vì biển số xe là khóa chính của
        * bảng bien_so_xe, không thể update
        */
        const transaction = await sequelize.transaction();
        try {
            const bike = req.body;
            if (!bike) throw new Error("Bike cannot be empty");
            const result = await Xe.update(bike, {
                where: { ma_xe: bike.ma_xe }
            })
            if (bike?.hinhAnhs) {
                await hinhAnh.bulkCreate(bike.hinhAnhs, {
                    validate: true,
                    ignoreDuplicates: true,
                });
            }
            if (bike?.deleteImg) {
                await hinhAnh.destroy({
                    where: {
                        url: bike.deleteImg.map(item => item.url)
                    }
                })
                CloudinaryService.deleteImgs(bike.deleteImg); // not use await here
            }
            await transaction.commit();
            if (!result) {
                return res.status(200).send(new ResponseMessage("update failed", 400));
            }
            return res.status(200).send(new ResponseMessage("update successfully", 200));
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(200).send(new ResponseMessage(error.message, 400));
        }
    }
}
function setBikeImage(img, id) {
    if (!img || img.length == 0) return [];
    return [{
        url: img.url,
        publicId: img.publicId,
        ma_xe: id
    }]
    // return listImg.map(item => {
    //     return {
    //         url: item.url,
    //         publicId: item.publicId,
    //         ma_xe: id
    //     }
    // })
}
function setBikeLicensePlate(lp, id) {
    if (!lp || lp.length == 0) return [];
    return lp.map(item => {
        return {
            bien_so: item.trim(),
            dang_thue: false,
            tinh_trang: true,
            ma_xe: id
        }
    })
}

export default XeService;