import Utils from "../utils/utils.js";


const authentication =(req, res, next) =>{
    let authHeader = req.headers['authorization'];
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    const token = authHeader.split(" ")[1];  // remove 'Bearer ' from the token string
    const user = Utils.getDecodeTokenData(token)
    if(!user) {
        return res.status(401).json({message: 'Invalid token'});
    }
    req.user = user;
    next();
}
export default authentication;