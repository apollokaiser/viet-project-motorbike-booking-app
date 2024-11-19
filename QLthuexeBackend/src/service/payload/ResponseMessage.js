

/***
 * @param {} message
 * @param {} status status code, default is 200
 */

export class ResponseMessage {
    constructor(message = null, status = 200) {
        this.status = status;
        this.message = message || "Successfully";
    }
}
export class ResponseBody {
    constructor(message, data, status = 200) {
        this.data = data;
        this.status = status;
        this.message = message;
    }
}