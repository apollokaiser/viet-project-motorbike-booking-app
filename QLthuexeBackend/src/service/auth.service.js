import oAuth2Client from '../config/Oauth2Client.conf.js';
import khachHang from "../models/khachhang.js"
import Utils from '../utils/utils.js';
import 'dotenv/config'


export async function loginWithGoogle(req,res,next) {
    const { code } = req.body;
    if (!code) {
        return res.status(400).json({ message: 'No code provided' });
    }
    const result = await getUserInfo(code);
    // call service to fimd or save data
    if(!result) {
        return res.status(400).json({ message: 'Error' });
    }
    const user = await findOrCreateUser(result);
    const jwt = Utils.createJWT(user[0].dataValues);
    const refreshToken = Utils.createRefreshToken(user);
    res.status(200).send({
        message: 'User authenticated successfully',
        data:{
            jwt,
            refreshToken,
            user:user[0].dataValues
        }
    })
}
const getUserInfo = async (authCode) =>{
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

const findOrCreateUser = async(user)=>{
    if(!user) return null;
    const customer = await khachHang.findOrCreate({
        where:{google_id : user.id},
        defaults:{
            google_id:user.id,
            ho_ten:user.name,
            email:user.email
        },
        attributes:['google_id','ho_ten','email','CMND',"GPLX"],
    })
    return customer;
} 