import jwt from "jsonwebtoken";
import QueryString from "qs";
import crypto from "crypto";
const secretKey = "ce851b9793332b8bfb999ce5338dfe75270e769639eea987b99e63c5325239ef";
const secretRefreshToken = "myappsecret";
import { v4 as uuidv4 } from 'uuid';

class Utils {
    static createJWT(user) {
        return jwt.sign({
            ...user
        },
            secretKey,
            { expiresIn: '1h', algorithm: 'HS256' });
    }
    /**
     * 
     * @param {object} user  
     */
    static createRefreshToken(user) {
        return jwt.sign({
            ...user
        },
            secretRefreshToken,
            { expiresIn: '7d' })
    }

    static getDecodeTokenData(token) {
        try {
            const decodedData = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
            return decodedData;
        } catch (error) {
            console.log('Token invalid', error);
            return null;
        }
    }

    static getDecodeRefreshTokenData(token) {
        let decoded_data = null;
        jwt.verify(token, secretRefreshToken, (err, decoded) => {
            if (err) {
                console.log('err refresh token', err);
                return null;
            }
            decoded_data = decoded;
        });
        return decoded_data;
    }
    static createMaXe(loaiXe) {
        if (!loaiXe) return null;
        const id = uuidv4().split('-');
        const date = new Date().getTime() + Math.floor(Math.random() * 100);
        return loaiXe + id;
    }
    static createMaThueXe(paymentMethod) {
        if (!paymentMethod) return null;
        const date = new Date().getTime();
        switch (paymentMethod) {
            case 'ONLINE':
                return 'ON' + date;
            case 'OFFLINE':
                return 'OF' + date;
            case 'COD':
                return 'CD' + date;
            default:
                return null;
        }
    }
    static sortObject(obj) {
        let sorted = {};
        let str = [];
        let key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
        }
        return sorted;
    }
    static getVnpUrl(vnp_Params, vnp_SecretKey, vnpUrl) {
        vnp_Params = this.sortObject(vnp_Params);
        let signData = QueryString.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac("sha512", vnp_SecretKey);
        let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + QueryString.stringify(vnp_Params, { encode: false });
        return vnpUrl;
    }
    static getCheckSum(vnp_Params, secretKey) {
        vnp_Params = this.sortObject(vnp_Params);
        let signData = QueryString.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
        return signed;
    }
    static formatUTF8(str) {
        return str.trim().toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .replace(" ", "_")
    }
    static NoEmpty(obj) {
        if (obj == null || obj == undefined || obj.trim() == "") throw new Error("Cannot empty");
    }
    static createSecrect(publicId, timestamp, apiSecret) {
        const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
        return crypto.createHash('sha256').update(stringToSign).digest('hex');
    }
}


export default Utils;