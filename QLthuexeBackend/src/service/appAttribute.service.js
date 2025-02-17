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
            const { key } = req.query;
            const result = await appAttributes.findByPk(key, {
                attributes: ["value"],
            });
            if (!result) {
                return res.status(200).send(new ResponseMessage("Couldn't find attribute", 400));
            }
            let data = result.dataValues.value;
            return res.status(200).send(new ResponseBody("Attribute found", data));
        } catch (error) {
            console.log(error);
            return res.status(200).send(new ResponseMessage("Error", 400));
        }
    }
    static async updateAttributes(req, res) {
        try {
            const { attrs } = req.body;
            Object.keys(attrs).forEach(async (key) => {
                const value = attrs[key];
                const result = await appAttributes.upsert({ key, value });
                if (!result) throw new Error();
            })
            res.status(200).send(new ResponseMessage("Update successfully", 200));
        } catch (error) {
            console.log(error);
            return res.status(200).send(new ResponseMessage("Error", 400));
        }
    }
    static async getLogo() {
        try {
            const result = await appAttributes.findOne({ where: { key: "web_icon" } });
            return result ? result : null;
        } catch (error) {
            return null;
        }   
    }
}