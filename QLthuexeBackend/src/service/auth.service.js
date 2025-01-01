import oAuth2Client from '../config/Oauth2Client.conf.js';
import khachHang from "../models/khachhang.js"
import nhanVien from "../models/nhanvien.js"
import Utils from '../utils/utils.js';
import 'dotenv/config'
import { ResponseBody, ResponseMessage } from './payload/ResponseMessage.js';


export async function loginWithGoogle(req, res, next) {
    const { code } = req.body;
    if (!code) {
        return res.status(400).json({ message: 'No code provided' });
    }
    const result = await getUserInfo(code);
    // call service to fimd or save data
    if (!result) {
        return res.status(400).json({ message: 'Error' });
    }
    const user = await findOrCreateUser(result)
    const jwt = Utils.createJWT(user[0].dataValues);
    const refreshToken = Utils.createRefreshToken(user);
    res.status(200).send({
        message: 'User authenticated successfully',
        data: {
            jwt,
            refreshToken,
            user: user[0].dataValues
        }
    })
}
const getUserInfo = async (authCode) => {
    try {
        const data = await oAuth2Client.getToken(authCode);
        oAuth2Client.setCredentials(data.tokens)
        const url = 'https://www.googleapis.com/oauth2/v2/userinfo';
        const res = await oAuth2Client.request({ url });
        return res.data;
    } catch (error) {
        console.log("Error: " + error);
        return null;
    }
}

const findOrCreateUser = async (user) => {
    if (!user) return null;
    const customer = await khachHang.findOrCreate({
        where: { google_id: user.id },
        defaults: {
            google_id: user.id,
            ho_ten: user.name,
            email: user.email
        },
        attributes: ['google_id', 'ho_ten', 'email', 'CMND', "GPLX"],
    })
    return customer;
}
export const loginWithAdminAccount = async (req, res) => {
    const { auth } = req.body;
    if (!auth) return res.status(200).send(new ResponseMessage("Invalid data", 401))
    try {
        const result = await nhanVien.findOne({
            where: {
                email: auth.email,
                mat_khau: auth.password
            },
            attributes: ['ma_nv', 'email', 'ho_ten']
        })
        if (!result) {
            return res.status(200).send(new ResponseMessage("Invalid account", 401))
        }
        // kiểm tra lại giá trị result
        const admin = result.dataValues;
        const jwt_admin = Utils.createJWT(admin)
        const refreshToken_admin = Utils.createRefreshToken(admin)
        return res.status(200).send(new ResponseBody("Successful", { jwt_admin, refreshToken_admin, admin }, 200))
    } catch (error) {
        console.log(error);
        res.status(200).send(new ResponseMessage("Error", 500))
    }
}