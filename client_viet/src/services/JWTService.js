import { jwtDecode } from "jwt-decode";

export default class JWTService {
    static decode (token) {
        try {
            const decoded = jwtDecode(token);
            if(JWTService.checkExpired(decoded)) {
                return 999;
            }
            return decoded;
        } catch (e) {
            return null;
        }
    }
    static checkExpired(decoded){
        const currentTimeMillis = Date.now();
        const currentTimeSeconds = Math.floor(currentTimeMillis / 1000);
        if (decoded.exp < currentTimeSeconds)
            return true;
        return false;
    }
}