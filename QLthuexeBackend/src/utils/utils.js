import jwt from"jsonwebtoken";
const secretKey = "myapp";
const secretRefreshToken = "myappsecret";

class Utils {
    static createJWT(user) {
        return jwt.sign({
            //chua có
        },
            secretKey,
            { expiresIn: '1h' });
    }

    static createRefreshToken(user) {
        return jwt.sign({
            //chua có
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
    
    
}

export default Utils;