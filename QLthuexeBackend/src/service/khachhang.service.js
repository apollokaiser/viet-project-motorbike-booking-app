
import khachHang from "../models/khachhang.js";
import { ResponseBody, ResponseMessage } from "./payload/ResponseMessage.js"
import utils from "../utils/utils.js";
class KhachHangService {
    static async getALLKhachhang(req, res) {
        try {
            const result = await khachHang.findAll(
                {
                    attributes: ['CMND', 'ho_ten']
                }
            );
            if (result) {
                return res.status(200).send({
                    status: 200,
                    data: result,
                    message: 'success'
                });
            }

            return res.status(200).send({
                status: 401,
                message: 'fail'
            });
        }
        catch (err) {
            console.log("error get all users", err);
            return res.status(200).send({
                status: 404,
                message: 'fail'
            })
        }
    }
    static async getUserInfo(req, res) {
        try {
            const { id } = req.query;
            const user = await khachHang.findOne({
                where: { google_id: id }
            })
            if (!user) {
                return res.status(200).send(new ResponseMessage("User not found", 404));
            }
            return res.status(200).send(new ResponseBody("User info", user, 200));
        } catch (error) {
            console.log("Error get user info : " + error);
            return res.status(200).send(new ResponseMessage("Error getting user info", 500));
        }
    }
    static async updateCustomerInfo(req, res) {
        try {
            const { userInfo } = req.body;
            const user = {
                CMND: userInfo.CMND.id,
                GPLX: userInfo.GPLX.id,
                ho_ten: userInfo.CMND.name,
                sdt: userInfo.phone,
                GPLX_type: userInfo.GPLX.class
            }
            const result = await khachHang.update(user,
                {
                    where: { google_id: req.user.google_id }
                }
            );
            if (!result) {
                return res.status(200).send(new ResponseMessage("cannot update", 400));
            }
            delete user.GPLX_type;
            delete user.sdt;
            user.google_id = req.user.google_id;
            user.email = req.user.email;
            const jwt = utils.createJWT(user);
            const refreshToken = utils.createRefreshToken(user);
            return res.status(200).send(new ResponseBody("update successfully", { jwt, refreshToken, user }, 200));
        } catch (err) {
            console.log(err);
            return res.status(200).send(new ResponseMessage("update failed", 500));
        }
    }
}
export default KhachHangService;