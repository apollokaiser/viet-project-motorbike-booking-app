
import khachHang from "../models/khachhang.js";
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
    static async updateCustomerInfo(req, res) {
        try {
            const { customer } = req.body;
            //Kiểm tra đăng nhập
            const id = 1;            //Kiểm tra đăng nhập (1 là để test)
            const result = await khachHang.update(
                {
                    CMND: customer.CMND,
                    GPLX: customer.GPLX,
                    ho_ten: customer.ho_ten,
                    email: customer.email,
                    sdt: customer.sdt
                },
                {
                    where: {
                        google_id: id
                    }
                }
            );
            if (!result) {
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

        } catch (err) {
            console.log(err);
            return res.status(200).send({
                status: 401,
                message: 'create khach hang fail',
                data: null
            });
        }
    }
}
export default KhachHangService;