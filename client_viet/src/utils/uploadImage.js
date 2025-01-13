import axios from "axios";

const UPLOAD_ENDPOINT = import.meta.env.VITE_UPLOAD_ENDPOINT;
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
/**
 * @param {file} image Hình ảnh cần tải lên
 * @param {string} uploadPreset cấu hình tải ảnh của bạn
 * @returns {string} secureUrl đường dẫn (url) cho ảnh
 */
//FIXME: Nên đưa xuống server để xử lý (đang thử nghiệm trên frontend)
async function uploadImages(image, uploadPreset=null){
    if(!image) return null;
    const url = `${UPLOAD_ENDPOINT}/${CLOUD_NAME}/upload`
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', uploadPreset ? uploadPreset: "default_preset")
    try {
        console.log("Uploading " + image.name);
        const response = await axios.post(url, formData)
        return {
            secureUrl:response.data.secure_url,
            publicId:response.data.public_id,
        };
    } catch (error) {
        console.log("Failed to upload" + error.message);
        return null;
    }
}
export default uploadImages;