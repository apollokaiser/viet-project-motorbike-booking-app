import { ResponseMessage, ResponseBody } from "./payload/ResponseMessage.js"
import thueXe from "../models/thuexe.js";
import { Op } from "sequelize";
import { orderStatus } from "../utils/initialize.js";
import { sequelize } from "../models/index.js";
export default class ThueXeSerivce {
    static async getOrders(req, res) {
        const { page = 1, size = 10, expired, status } = req.query;
        try {
            const condition = {
                tinh_trang_thue: status ?? [1, 2, 3] // Gán mặc định status = 1 nếu không truyền
            };

            if (expired) {
                condition.ngay_tra = { [Op.gte]: Math.floor(Date.now() / 1000) }; // Fix timestamp
            }
            const result = await thueXe.findAll({
                limit: Number.parseInt(size),
                offset: (Number.parseInt(page) - 1) * Number.parseInt(size),
                where: condition
            })
            if (!result.length) return res.status(200).send(new ResponseMessage("No order data", 400));
            return res.status(200).send(new ResponseBody("Get orders successfully", result));
        } catch (error) {
            console.log(error);
            return res.status(200).send(new ResponseMessage("Error", 500));
        }
    }
    static getOrderStatus(req, res) {
        return res.status(200).send(new ResponseBody("Get orders status successfully", orderStatus));
    }
    static async changeOrderStatus(req, res) {
        const { id, status, the_chan } = req.query;
        try {
            if (!the_chan && status == 3) {
                throw new Error("the_chan parameter is required with order status 3");
            }
            const orderUpdate = {
                tinh_trang_thue: status,
            }
            if (the_chan && status == 3) {
                orderUpdate.tien_the_chan = the_chan;
                orderUpdate.da_giao_tien = true;
            }
            const order = await thueXe.update(orderUpdate, {
                where: {
                    ma_don_dat: id
                }
            }
            )
            if (!order) return res.status(200).send(new ResponseMessage("Order not found", 404));
            return res.status(200).send(new ResponseMessage("Update successfully", 200));
        } catch (error) {
            console.log("Error update order status : " + error);
            return res.status(200).send(new ResponseMessage(error.message, 400));
        }
    }
    static async getOrderDetail(req, res) {
        try {
            const { id } = req.query;
            if (!id) throw new Error("Invalid request ID")
            const order = await thueXe.findOne({
                where: {
                    ma_don_dat: id
                }
            })
            const detail = await sequelize.query("select * from orderdetail where ma_don_dat = :id", {
                replacements: { id },
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
}