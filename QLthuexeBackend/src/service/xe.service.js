import Xe from "../models/xe.js";

class XeService {
    static async getALLXe(req, res) {
        try {
            const xe = await Xe.findAll();
            if (xe) {
                return res.status(200).send({
                    status: 200,
                    data: xe
                });
            } else {
                return res.status(404).send({
                    status: 404,
                    message: "No xe found"
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                status: 500,
                message: "Internal Server Error"
            });
        }
    }
    static async addXe(req,res) {

    }
}

export default XeService;