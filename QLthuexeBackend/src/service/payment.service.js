import { ResponseBody, ResponseMessage } from "./payload/ResponseMessage.js";
import { secretKey, vnp_Params as vpnParams } from "../config/vnpay.conf.js";
import { orderStatus } from "../utils/initialize.js";
import { Op, literal } from "sequelize";
import Utils from "../utils/utils.js";
import moment from "moment";

// IMPORT MODELS
import ctThueXe from "../models/chitietthuexe.js";
import { sequelize } from "../models/index.js";
import thueXe from "../models/thuexe.js";
import Xe from "../models/xe.js";




class ThueXeService {
    static async thanhToan(req, res) {
        try {
            const donThueXe = await addOrder(req);
            return donThueXe ?
                res.status(200)
                    .send(new ResponseMessage()) :
                res.status(200)
                    .send(new ResponseMessage("Failed to insert order", 400))
        } catch (error) {
            console.log(error);
            return res.status(200)
                .send(new ResponseMessage(error.message, 400))
        }
    }
    static async redirectToVnPay(req, res, next) {
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
                    tinh_trang_thue: orderStatus.WAITING_CONFIRMATION.id
                },
                    {
                        where: {
                            ma_don_dat: orderId
                        }
                    });
                    if(!updateOrder) throw new Error("error updating order");
            } catch (error) {
                console.log("thanhToanOnline error: " + error);
                return res.redirect(`${clientHost}/thanh-toan/fail-successfully?code=${vnp_Params['vnp_ResponseCode']}&order=${orderId}`);
            }
            return res.redirect(`${clientHost}/thanh-toan/thanh-cong?code=${vnp_Params['vnp_ResponseCode']}&order=${orderId}`);
        } else {
            return res.redirect(`${clientHost}/thanh-toan/that-bai?code=${vnp_Params['vnp_ResponseCode']}`);
        }
    }
}


/**
 * 
 * @param {Request} req - request object
 * @param {boolean} pending - temporary - if temporary is true, it will set tinh_trang_thue 0
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
        tinh_trang_thue: !pending ? orderStatus.WAITING_CONFIRMATION.id : orderStatus.PENDING_PAYMENT.id,
        tong_tien: orderDetails.total,
        phi_van_chuyen: orderDetails.transport_fee,
        tong_thue: orderDetails.tong_thue,
        google_id: req.user.google_id,
        ma_phi: orderDetails.ma_phi
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
            so_luong: detail.quantity,
            gia_tien: detail.gia_thue,
        }
    })
}

const addOrder = async (req, pending = false) => {
    const transaction = await sequelize.transaction();
    try {
        const { orderDetails } = req.body;
        await checkQuantity(orderDetails);
        const donThueXe = createNewOrder(req, pending);
        const orderDetailDatas = createNewOrderDetails(orderDetails, donThueXe.ma_don_dat);
        if (orderDetailDatas.length == 0) throw new Error("No order details");
        const result_insert_order = await thueXe.create(donThueXe, { transaction })
        const result_insert_detail = await ctThueXe.bulkCreate(orderDetailDatas, { transaction })
        if (!result_insert_detail && !result_insert_order)
            throw new Error("Cannot insert order");
        await transaction.commit();
        return donThueXe;
    } catch (error) {
        console.log(error);
        await transaction.rollback();
        return null;
    }
}
/***
 * @param {boolean} update - default true, if update is false, quantity won't update
 * @param {Array} orderDetails - order detail list. If it's not an array or empty, return empty array
 */
const checkQuantity = async (orderDetails, transaction = null, update = true) => {
    if (!orderDetails) return [];
    if (!Array.isArray(orderDetails.items)) return [];
    if (!transaction) transaction = await sequelize.transaction();
    try {
        const result = await Xe.findAll({
            where: {
                ma_xe: orderDetails.items.map(item => item.id),
                so_luong: { [Op.gte]: orderDetails.items.map(item => item.quantity) }
            },
            attributes: ['ma_xe', 'so_luong']
        });
        if (result.length !== orderDetails.items.length) {
            throw new Error("Sản phẩm bạn đặt hàng không đủ số lượng");
        }
        // update quantity
        if (!update) {
            await transaction.commit();
            return;
        }
        for (let item of orderDetails.items) {
            await Xe.update({
                so_luong: literal(`so_luong - ${item.quantity}`)
            },
                {
                    where: {
                        ma_xe: item.id,
                        so_luong: { [Op.gte]: item.quantity }
                    },
                    transaction
                })
        }
        await transaction.commit();
    } catch (error) {
        console.log("Check quantity error :" + error);
        await transaction.rollback();
        throw error;
    }

}
export default ThueXeService;

