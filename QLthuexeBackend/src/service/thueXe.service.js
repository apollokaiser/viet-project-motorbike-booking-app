import { ResponseMessage, ResponseBody } from "../payload/ResponseMessage.js"
import thueXe from "../models/thuexe.js";
import { Op } from "sequelize";
import { sequelize } from "../models/index.js";
import phuongThucThanhToan from "../models/phuongthucthanhtoan.js";
import tinhTrangThue from "../models/tinhtrangthue.js";
import ctGiaoXe from "../models/chitietgiaoxe.js";
export default class ThueXeSerivce {
    static async getOrders(req, res) {
        const { page = 1, size = 10, expired } = req.query;
        try {
            const condition = {
                ma_tinh_trang: [1, 2, 3] // Gán mặc định status = 1 nếu không truyền
            };

            if (expired) {
                condition.ngay_tra = { [Op.gte]: Math.floor(Date.now() / 1000) }; // Fix timestamp
            }
            const result = await thueXe.findAll({
                limit: Number.parseInt(size),
                offset: (Number.parseInt(page) - 1) * Number.parseInt(size),
                where: condition,
                include: [
                    {
                        model: tinhTrangThue,
                        as: "tinhTrang"
                    }
                ],
                attributes: ["ma_don_dat", "ngay_dat", "ngay_bat_dau_thue", "ngay_tra", "ten_nguoi_nhan", "tong_thue"]
            })
            if (!result.length) return res.status(200).send(new ResponseMessage("No order data", 400));
            return res.status(200).send(new ResponseBody("Get orders successfully", result));
        } catch (error) {
            console.log(error);
            return res.status(200).send(new ResponseMessage("Error", 500));
        }
    }
    static async getPaymentMethods(req, res) {
        try {
            const paymentMethods = await phuongThucThanhToan.findAll();
            if (!paymentMethods?.length) return res.status(200).send(new ResponseMessage("No payment methods data", 400));
            return res.status(200).send(new ResponseBody("Get payment methods successfully", paymentMethods));
        } catch (error) {
            console.log(error);
            return res.status(200).send(new ResponseMessage("Error", 500));
        }
    }
    static async getOrderStatus(req, res) {
        try {
            const orderStatus = await tinhTrangThue.findAll();
            if (!orderStatus?.length) return res.status(200).send(new ResponseMessage("No order status data", 400));
            return res.status(200).send(new ResponseBody("Get orders status successfully", orderStatus));
        } catch (error) {
            console.log(error);
            return res.status(200).send(new ResponseMessage("Error", 500));
        }
    }
    static async changeOrderStatus(req, res) {
        const { id, status, the_chan } = req.query;
        const transaction = await sequelize.transaction();
        try {
            if (!the_chan && status == 3) {
                throw new Error("the_chan parameter is required with order status 3");
            }
            const orderUpdate = {
                ma_tinh_trang: status,
            }
            if (the_chan && status == 3) {
                orderUpdate.da_giao_tien = true;
                orderUpdate.ngay_giao_xe = new Date().getTime / 1000
            }
            const order = await thueXe.update(orderUpdate, {
                where: {
                    ma_don_dat: id
                },
                transaction: transaction
            }
            )
            if (!order) return res.status(200).send(new ResponseMessage("Order not found", 404));
            if (status == 2) {
                await ThueXeSerivce.addDeliveryDetail(req, res, transaction);
            }
            await transaction.commit();
            return res.status(200).send(new ResponseMessage("Update successfully", 200));
        } catch (error) {
            console.log("Error update order status : " + error);
            await transaction.rollback();
            return res.status(200).send(new ResponseMessage(error.message, 400));
        }
    }
    static async addDeliveryDetail(req, res, transaction) {
        //hàm này dùng để cấp xe cho user
        const { id } = req.query;
        await sequelize.query("CALL PROC_ADD_DELIVERY_DETAIL(:id)", {
            replacements: { id },
            type: sequelize.QueryTypes.RAW,
            transaction: transaction
        })
    }
    static async getOrderDetail(req, res) {
        try {
            const { order_id } = req.query;
            if (!order_id) throw new Error("Invalid request ID")
            const order = await thueXe.findOne({
                where: {
                    ma_don_dat: order_id,
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt", "ma_thanh_toan", "ma_tinh_trang", "ma_phi"],
                },
                include: [
                    {
                        model: phuongThucThanhToan,
                        as: "ptThanhToan"
                    },
                    {
                        model: tinhTrangThue,
                        as: "tinhTrang"
                    },
                    {
                        model: ctGiaoXe,
                        as: "giaoXe"
                    }
                ]
            })
            if (req.user.google_id) {
                // người dùng sẽ không thấy được họ được giao chiếc xe gì
                delete order.giaoXe;
            }
            let queryString = `select * from v_order_detail where ma_don_dat = :id`;
            const detail = await sequelize.query(queryString, {
                replacements: { id: order_id },
                type: sequelize.QueryTypes.SELECT
            });
            if (!order) return res.status(200).send(new ResponseMessage("Order not found", 404));
            order.dataValues.detail = detail;
            return res.status(200).send(new ResponseBody("Get order detail successfully", order));
        } catch (error) {
            console.log("Error update order status : " + error)
            return res.status(200).send(new ResponseMessage(error.message, 400));
        }
    }
    static async getOrderByCustomerId(req, res) {
        try {
            const { id } = req.query;
            if (!id) throw new Error("Invalid request ID");
            const result = await thueXe.findAll({
                where: {
                    google_id: id
                },
                attributes: ["ma_don_dat", "ngay_dat", "ma_tinh_trang", "tong_thue"]
            })
            if (!result.length) return res.status(200).send(new ResponseMessage("No order data", 400));
            return res.status(200).send(new ResponseBody("Get orders successfully", result));
        } catch (error) {
            console.log(error);
            return res.status(200).send(new ResponseMessage("Error", 500));
        }
    }
}
const getStatusName = (status_id) => {
    return Object.values(orderStatus).find(item => item.id == status_id) || "Unknown";
}