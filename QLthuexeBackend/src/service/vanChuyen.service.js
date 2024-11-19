import vanChuyen from "../models/vanchuyen.js";


class VanChuyenService {
    static async getPhiVanChuyen (req,res) {
        try{
            const result = await vanChuyen.findAll();
            return res.status(200).send({
                status: "200",
                message: "Success",
                data: result
            })
        } catch(e){
            console.log("error get transport fee : "+ e);
            return res.status(200).send({
                status:"500",
                message: 'Internal Server Error'
            });
        }
    }

}

export default VanChuyenService;