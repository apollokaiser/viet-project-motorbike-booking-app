import { ResponseBody, ResponseMessage } from "../payload/ResponseMessage.js";
import { secretKey, vnp_Params as vpnParams } from "../config/vnpay.conf.js";
import { orderStatus } from "../utils/initialize.js";
import { Op } from "sequelize";
import Utils from "../utils/utils.js";
import moment from "moment";

// IMPORT MODELS
import ctThueXe from "../models/chitietthuexe.js";
import { sequelize } from "../models/index.js";
import thueXe from "../models/thuexe.js";
import Xe from "../models/xe.js";
import MailService from "./mail.service.js";




class ThueXeService {
    static async thanhToan(req, res) {
        const noOrderInLast24h = await checkRecentOrder(req.user.google_id);
        if (!noOrderInLast24h) return res.status(200)
            .send(new ResponseMessage("You have an order in last 24h", 201));
        try {
            const donThueXe = await addOrder(req);
            return donThueXe ?
                res.status(200)
                    .send(new ResponseMessage()) :
                res.status(200)
                    .send(new ResponseMessage("Failed to insert order", 400))
        } catch (error) {
            return res.status(200)
                .send(new ResponseMessage(error.message, 400))
        }
    }
    static async redirectToVnPay(req, res, next) {
        const noOrderInLast24h = await checkRecentOrder(req.user.google_id);
        if (!noOrderInLast24h) return res.status(200)
            .send(new ResponseMessage("You have an order in last 24h", 201));

        process.env.TZ = 'Asia/Ho_Chi_Minh';
        let vnp_Url = process.env.VNP_URL;
        const { orderDetails } = req.body;
        let vnp_Params = vpnParams;
        let date = new Date();
        let createDate = moment(date).format('YYYYMMDDHHmmss');
        let ipAddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        let amount = orderDetails.tong_thue;
        try {
            const donThueXe = await addOrder(req, true);
            if (!donThueXe)
                throw new Error('Cannot add order');

            vnp_Params['vnp_CreateDate'] = createDate;
            vnp_Params['vnp_TxnRef'] = donThueXe.ma_don_dat;
            vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + donThueXe.ma_don_dat;
            vnp_Params['vnp_IpAddr'] = ipAddr;
            vnp_Params['vnp_Amount'] = amount * 100;

            vnp_Url = Utils.getVnpUrl(vnp_Params, secretKey, vnp_Url);
            res.status(200)
                .send(new ResponseBody("Get vnpUrl successfully", vnp_Url));
        } catch (error) {
            console.log(error);
            return res.status(200)
                .send(new ResponseMessage(error.message, 400))
        }
    }
    static async thanhToanOnline(req, res) {
        const clientHost = process.env.URL_CLIENT;
        let vnp_Params = req.query;
        let secureHash = vnp_Params['vnp_SecureHash'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        let checkSum = Utils.getCheckSum(vnp_Params, secretKey);
        if (secureHash === checkSum) {
            const orderId = vnp_Params['vnp_TxnRef'];
            try {
                const updateOrder = await thueXe.update({
                    ma_tinh_trang: orderStatus.WAITING_CONFIRMATION.id,
                    da_giao_tien: true,
                },
                    {
                        where: {
                            ma_don_dat: orderId
                        }
                    });
                if (!updateOrder) throw new Error("error updating order");
            } catch (error) {
                console.log("thanhToanOnline error: " + error);
                return res.redirect(`${clientHost}/thanh-toan/fail-successfully?code=${vnp_Params['vnp_ResponseCode']}&order=${orderId}`);
            }
            return res.redirect(`${clientHost}/thanh-toan/thanh-cong?code=${vnp_Params['vnp_ResponseCode']}&order=${orderId}`);
        } else {
            return res.redirect(`${clientHost}/thanh-toan/that-bai?code=${vnp_Params['vnp_ResponseCode']}`);
        }
    }
    static async updateOrderStatus(req, res) {
        const { id, status } = req.params;
        if (!id || !status) throw new Error("Invalid request parameter");
        try {
            const result = await thueXe.update({
                ma_tinh_trang: status
            },
                {
                    where: {
                        ma_don_dat: id
                    }
                })
            if (!result) throw new Error("Error updating");
            return status(200)
                .send(new ResponseMessage("Update successfully", 200))
        } catch (error) {
            console.log("updateOrderStatus error: " + error);
            return res.status(200)
                .send(new ResponseMessage(error.message, 400))
        }

    }
}


/**
 * 
 * @param {Request} req - request object
 * @param {boolean} pending - temporary - if temporary is true, it will set ma_tinh_trang 0
 * @returns {object} return an order
 */
const createNewOrder = (req, pending = false) => {
    const { paymentInfo, paymentMethod, orderDetails } = req.body;
    const orderId = Utils.createMaThueXe(paymentMethod);
    return {
        ma_don_dat: orderId,
        ngay_dat: new Date().getTime() / 1000,
        ngay_bat_dau_thue: paymentInfo.startDate,
        ngay_tra: paymentInfo.endDate,
        dia_chi_nhan: paymentInfo.address,
        ten_nguoi_nhan: paymentInfo.name || req.user.ho_ten,
        sdt: paymentInfo.phone,
        yeu_cau: paymentInfo.notion,
        ma_tinh_trang: !pending ? 1 : 0,
        da_giao_tien: false,
        tong_tien: orderDetails.total,
        phi_giao_xe: orderDetails.transport_fee || 0,
        tong_thue: orderDetails.tong_thue,
        google_id: req.user.google_id,
        ma_phi: orderDetails.ma_phi,
        ma_thanh_toan: paymentMethod,
        tong_the_chan: orderDetails.tong_the_chan,
    }
}
const createNewOrderDetails = (orderDetails, orderId) => {
    if (!orderDetails) return [];
    if (!Array.isArray(orderDetails.items)) return [];
    if (!orderId) return [];
    return orderDetails.items.map(detail => {
        return {
            ma_don_dat: orderId,
            ma_xe: detail.id,
            gia_tien: detail.gia_thue,
            the_chan: detail.the_chan,
            so_luong: detail.quantity,
        }
    })
}

const addOrder = async (req, pending = false) => {
    const transaction = await sequelize.transaction();
    try {
        const { orderDetails } = req.body;
        await checkBikeStatus(orderDetails);
        const donThueXe = createNewOrder(req, pending);
        const orderDetailDatas = createNewOrderDetails(orderDetails, donThueXe.ma_don_dat);
        if (orderDetailDatas.length == 0) throw new Error("No order details");
        const result_insert_order = await thueXe.create(donThueXe)
        const result_insert_detail = await ctThueXe.bulkCreate(orderDetailDatas,)
        if (!result_insert_detail && !result_insert_order)
            throw new Error("Cannot insert order");
        // update vehicle quantity
        await updateQuantity(orderDetails.items);
        await transaction.commit();
        MailService.sendMail(req.user.email, "Thông tin đơn thuê xe của bạn", "OrderInfomation", {
            order: donThueXe,
            details: orderDetailDatas
        })
        return donThueXe;
    } catch (error) {
        console.log(error);
        await transaction.rollback();
        return null
    }
}
const updateQuantity = async (items) => {
    try {
        for (let index = 0; index < items.length; index++) {
           const result=  await Xe.increment({
                co_san: -items[index].quantity
            }, {
                where: {
                    ma_xe: items[index].id
                }
            })
            console.log(result);
        }
    } catch (error) {
        throw new Error(error);
    }

}
/***
 * @param {boolean} update - default true, if update is false, quantity won't update
 * @param {Array} orderDetails - order detail list. If it's not an array or empty, return empty array
 */
const checkBikeStatus = async (orderDetails) => {
    if (!orderDetails) return [];
    // quăng lỗi (nếu có) cho function gọi hàm này bắt lỗi
    if (!Array.isArray(orderDetails.items)) throw new Error("orderDetails not found");
    const transaction = await sequelize.transaction();
    const vehicle_id = orderDetails.items.map(detail => detail.id);
    try {
        const result = await Xe.findAll({
            where: {
                ma_xe: vehicle_id,
            }
        })
        if (result.length == 0 || result.length != orderDetails.items.length) {
            throw new Error("Some bike status is not available");
        }
        //kiểm tra số lượng xem có đủ hết để thuê không
        const isEnough = result.every(item => orderDetails.items.find(detail => detail.id == item.ma_xe && detail.quantity <= item.co_san));
        if (!isEnough) {
            throw new Error("Not enough bike quantity");
        }
        await transaction.commit();
        return;
    } catch (error) {
        console.log("Check error :" + error);
        await transaction.rollback();
        throw error;
    }
}

const checkRecentOrder = async (googleId) => {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
    try {
        const result = await thueXe.findOne({
            where: {
                google_id: googleId,
                createdAt: {
                    [Op.gte]: twentyFourHoursAgo,
                },
                ma_tinh_trang: {
                    [Op.notIn]: [4, 5]
                }
            }
        })
        if (result) {
            throw new Error("Bạn đã đặt hàng trong vòng 24h");
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export default ThueXeService;

