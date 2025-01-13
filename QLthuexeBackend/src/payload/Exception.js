import { ResponseMessage } from "./ResponseMessage.js";

export default class Exception {
    constructor(message, code = 400) {
        this.message = message;
        this.code = code;
    }
    /**
     * 
     * @param {Error} error 
     * @param {String} defaultMessage 
     * @param {Number} statusCode 
     * @returns Return an error payload for response 
     */
    static sendError(error, defaultMessage = "error", statusCode = 400) {
        if (error instanceof Exception) {
            return new ResponseMessage(error.message, error.code);
        }
        return new ResponseMessage(defaultMessage, statusCode);
    }
}