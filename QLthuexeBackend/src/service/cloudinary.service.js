import axios from "axios"
import Utils from "../utils/utils.js";
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_SECRET;

export class CloudinaryService {
    static async deleteImgs(items) {
        try {
            if (!items || items.length === 0) throw new Error("CloudinaryService cannot be deleted");
            items.map(async (item) => {
                const publicId = item.publicId;
                const timestamp = Math.floor(Date.now() / 1000);
                const signature = Utils.createSecrect(publicId, timestamp, apiSecret);
                const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
                    public_id: publicId,
                    api_key: apiKey,
                    timestamp,
                    signature
                });
                console.log('Delete Response:', response.data);
            })

        } catch (error) {
            console.log(error);
        }
    }

}