import axios from "@/configs/axios.js"
import JWTService from "./JWTService";
import Swal from "sweetalert2";
export default class AuthService {
    static async loginWithGoogle(code) {
        try {
            const result = await axios.post(`/auth/login/google`, { code });
            if (result.status == 200) {
                const { user, jwt, refreshToken } = result.data.data;
                localStorage.setItem("jwt", JSON.stringify(jwt));
                localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
                return user;
            }
        } catch (error) {
            Swal.fire({
                title: "Khách hàng chưa đăng nhập",
                icon: "info",
                confirmButtonText: "Quay lại",
            })
            console.error("Login failed:", error);
            return null;
        }
    }
    static async loginWithAdminAccount (auth) {
        try {
            const result = await axios.post("auth/login/admin", { auth });
            if (result.data?.status == 200) {
                localStorage.setItem("jwt_admin", JSON.stringify(result.data.data.jwt_admin));
                localStorage.setItem(
                  "refreshToken_admin",
                  JSON.stringify(result.data.refreshToken_admin)
                );
                return result.data.data.admin;
            }
            return null;
        } catch (error) {
            return null;
        }
    }
    /**
     * check local storage to get authentication
     * @returns user (google_id, ho_ten, email, CMND, GPLX)
     */
    static checkAuthentication() {
        const jwt = localStorage.getItem("jwt");
        if (!jwt) return null;
        const jwtData = JWTService.decode(jwt);
        if (jwtData == 999) {
            localStorage.removeItem("jwt");
            localStorage.removeItem("refreshToken");
        } else if (jwtData) {
            return {
                google_id: jwtData.google_id,
                ho_ten: jwtData.ho_ten,
                email: jwtData.email,
                CMND: jwtData.CMND,
                GPLX: jwtData.GPLX,
            }
        }
        return null;
    }
    static checkAdminAuthorization() {
        const jwt_admin = JSON.parse(localStorage.getItem("jwt_admin"));
        if (!jwt_admin) return null;
        const decoded = JWTService.decode(jwt_admin);
        if (decoded === 999 || decoded === null) {
            localStorage.removeItem("jwt");
            localStorage.removeItem("refreshToken");
        } else {
            return decoded;
        }
        return null;
    }
    static setLocalAuth(data) {
        localStorage.setItem("jwt", data.jwt);
        localStorage.setItem("refreshToken", data.refreshToken);
    }
    static logout() {
        localStorage.removeItem("jwt");
        localStorage.removeItem("refreshToken");
    }
}