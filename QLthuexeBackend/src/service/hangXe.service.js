import hangXe from "../models/hangxe.js";


class HangXe  {
    static async getAllHangXe() {
        try {
            const brand = await hangXe.findAll();
            if (brand) {
                return res.status(200).send({
                    status: 200,
                    data: brand
                });
            } else {
                return res.status(404).send({
                    status: 404,
                    message: "No hangXe found"
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
}