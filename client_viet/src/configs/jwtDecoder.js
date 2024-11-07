import { jwtDecode } from "jwt-decode"


export default function decode (token) {
    try {
        const decoded = jwtDecode(token);
        const currentTimeMillis = Date.now();
        const currentTimeSeconds = Math.floor(currentTimeMillis / 1000);
        if (decoded.exp < currentTimeSeconds)
            return 999;
        return decoded;
    } catch (e) {
        return null;
    }
}