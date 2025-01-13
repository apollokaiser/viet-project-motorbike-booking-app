
import hoaDon from "../models/hoadon.js"
import chiTietphiPhat from "../models/chitietphiphat.js"
import { ResponseMessage } from "../payload/ResponseMessage.js"
import { sequelize } from "../models/index.js";
import thueXe from "../models/thuexe.js";
export default class HoaDonService {
    static async createBill(req, res) {
        try {
            const transaction = await sequelize.transaction();
            const { bill, fines } = req.body;
            bill.ma_nv = req.user.ma_nv;
            const fineList = fines?.map(fine => {
                return { ...fine, ma_don_dat: bill.ma_don_dat, ngay_tinh_phi: bill.ngay_lap_hd }
            })
            const result = await hoaDon.create(bill);
            const addFineResult = await chiTietphiPhat.bulkCreate(fineList);
            const updatexeResult = await thueXe.update({
                ma_tinh_trang: 5
            }, {
                where: {
                    ma_don_dat: bill.ma_don_dat
                }
            })
            const updateBienSoXeresult = sequelize.query("CALL PROC_UPDATE_VEHICLE_STATUS_AFTER_RENTAL_COMPLETION(:id)", {
                replacements: {
                    id: bill.ma_don_dat
                },
                type: sequelize.QueryTypes.RAW
            })
            if (!result || !addFineResult || !updatexeResult || !updateBienSoXeresult) {
                await transaction.rollback();
                return res.status(200).send(new ResponseMessage("Error creating", 400));
            }
            await transaction.commit();
            return res.status(200).send(new ResponseMessage("Created", 200));

        } catch (error) {
            console.log(error);
            return res.status(200).send(new ResponseMessage("Error creating bill", 400));
        }
    }
}