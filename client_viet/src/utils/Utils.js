export default class Utils {
    static setLocalAuth(jwt,refreshToken) {
        localStorage.setItem("jwt", JSON.stringify(jwt));
        localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    }
    static getLocalStorage(key) {
        const data = localStorage.getItem(key);
        return data? JSON.parse(data) : null;
    }
}