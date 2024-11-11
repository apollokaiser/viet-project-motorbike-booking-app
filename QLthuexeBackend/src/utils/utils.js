import jwt from"jsonwebtoken";
import { UUID } from "sequelize";
const secretKey = "myapp";
const secretRefreshToken = "myappsecret";

class Utils {
    static createJWT(user) {
        return jwt.sign({
            ...user
        },
            secretKey,
            { expiresIn: '1h' });
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
            { expiresIn: '7d' });
    }

    static getDecodeTokenData(token) {
        let decoded_data = null;
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.log('token err', err);
                return null;
            }
            decoded_data = decoded;
        });
        return decoded_data;
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
        if(!loaiXe) return null;
        const date  = new Date().getTime() + Math.floor(Math.random() * 100);
        return loaiXe + date;
    }
}

export default Utils;