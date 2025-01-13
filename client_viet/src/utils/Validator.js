export default class Validator {
    static notEmpty(value) {
        if (value && value.length) { // if value is array
            return value.length ? true : false;
        }
        return value && value.trim() !== "";
    }
    static isEmail(value) {
        //https://www.w3resource.com/javascript/form/email-validation.php#
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return String(value)
            .toLowerCase()
            .match(mailformat);
    }
    static isPhoneNumber(value) {
        //https://anonystick.com/blog-developer/regex-so-dien-thoai-viet-nam-2022080844903653
        const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        return phone.match(regexPhoneNumber) ? true : false;
    }
}