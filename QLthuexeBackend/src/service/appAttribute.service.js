import appAttributes from "../models/app_attribute.js";
import { sequelize } from "../models/index.js";
import { ResponseMessage, ResponseBody } from "../payload/ResponseMessage.js";
export default class AppAttributeService {
    static async getAttributes(req, res) {
        try {
            const result = await appAttributes.findAll();
            if (!result) {
                return res.status(200).send(new ResponseMessage("Couldn't find attribute", 400));
            }
            res.status(200).send(new ResponseBody("Attribute found", result));
        } catch (error) {
            console.log(error);
            return res.status(200).send(new ResponseMessage("Error", 400));
        }
    }
    static async getAttribute(req, res) {
        try {
            const { key } = req.params;
            const result = await appAttributes.findByPk(key);
            if (!result) {
                return res.status(200).send(new ResponseMessage("Couldn't find attribute", 400));
            }
            res.status(200).send(new ResponseBody("Attribute found", result));
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(200).send(new ResponseMessage("Error", 400));
        }
    }
    static async updateAttributes(req,res) {
        try {
            const { attrs } = req.body;
            for (let i = 0; i < attrs.length; i++) {
                const { key, value } = attrs[i];
                await appAttributes.update({ value }, { where: { key } });
            }
            if (!result.length) {
                return res.status(200).send(new ResponseMessage("Attribute not found", 404));
            }
            res.status(200).send(new ResponseMessage("Update successfully", 200));
        } catch (error) {
            console.log(error);
            return res.status(200).send(new ResponseMessage("Error", 400));
        }
    }
}