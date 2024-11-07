
import khachHang from "../models/models/khachhang.js";
import Xe from "../models/models/xe.js";
import Utils from "../utils/utils.js";
class khachHangservice {
    static async getALLKhachhang(req, res) {
        try {
            const kh = req.kh;
            console.log(kh);
            const class_kh = await khachHang.findAll(
                {
                    attributes: ['CMND','ho_ten']
                }
            );
            if (class_kh) {
                return res.status(200).send({
                    status: 200,
                    data: class_kh,
                    message: 'success'
                });
            }

            return res.status(200).send({
                status: 401,
                data: class_kh,
                message: 'fail'
            });
        }
        catch (err) {
            console.log("error get all users", err);
            return res.status(200).send({
                status: 404,
                data: [],
                message: 'fail'
            })
        }
    }
    static async searchXe(req, res) {
        try {
            const id=req.id;
            const searchXe =await Xe.findAll({
                where:{
                    loai_xe:id.loai_xe,
                    hang_xe:id.hang_xe
                },
            });
            if (searchXe) {
                res.status(200).send({
                    status: 200,
                    message: 'success',
                    data: searchXe
                });
            }
        }
        catch(err) {
            return res.status(200).send({
                status: 401,
                data: null,
                message: 'error'
            });

        }
    }
    static async createKhachhang(req,res)
    {
        try
        {
            const kh=req.kh;
            const createKH=await khachHang.create(
                {
                    CMND:kh.CMND,
                    GPLX:kh.GPLX,
                    ho_ten:kh.ho_ten,
                    email:kh.email,
                    sdt:kh.sdt
                }
            );
            if (!createKH) {
                return res.status(200).send({
                    status: 401,
                    data: null,
                    message: 'create khach hang user fail'
                });
            }
            return res.status(200).send({
                status: 200,
                message: 'success',
                data: createKH
            });

        }
        catch(err)
        {
            console.log(err);
            return res.status(200).send({
                status: 401,
                message: 'create khach hang fail',
                data: null
            });
        }
    }
    static async login(req, res) {
        

        try {
            //sử lý login tại đây
            const match = bcrypt.compare(password, user.mat_khau);
            if (match) {
                res.status(200).send({
                    status: 200,
                    message: 'success',
                    data: {
                        token: Utils.createJWT(user),
                        refreshToken: Utils.createRefreshToken(user),
                        nguoi_dung_id: user.nguoi_dung_id,
                        ten_dang_nhap: user.ten_dang_nhap,
                        email: user.email
                    }
                });
            } else {
                //sử lý thêm khách hàng
                this.createKhachhang;
                res.status(200).send({
                    status: 200,
                    message: 'success',
                    data: {
                        token: Utils.createJWT(user),
                        refreshToken: Utils.createRefreshToken(user),
                        nguoi_dung_id: user.nguoi_dung_id,
                        ten_dang_nhap: user.ten_dang_nhap,
                        email: user.email
                    }})
                    
            }
        } catch (error) {
            res.status(200).send({
                status: 404,
                message: 'fail',
                data: null
            });
            console.error('Error during login:', error);
        }
    }
    static async loginSuccess(req,res)
    {
        try
        {

        }
        catch(err)
        {

        }
    }
}
export default khachHangservice;