import { useState } from "react";
import icon_reverse from "@assets/img/icons-reverse.png"; 
function PreviewImage({
  originalUrl,
  handleUpload,
  multiple = false,
  revoke = false,
}) {
  const [image, setImage] = useState();
  const handleImageChange = (e) => {
    const blobURL = URL.createObjectURL(e.target.files[0]);
    setImage(blobURL);
    handleUpload(e,originalUrl);
  };
  const revokeImage = () => {
    if (image && image?.startsWith("blob:") && revoke) {
      URL.revokeObjectURL(image);
      handleUpload(null,null, true); // revoke the image 
      setImage(null);
    }
  };
  return (
    <>
      <div className="uk-width-1-2">
        <div className="uk-width-1-1@s">
          <h2 className="uk-text-center">Ảnh sản phẩm</h2>
          <label htmlFor="hinhAnhs" id="media-uploader1" name="media-uploader1">
            <div className="dz-message">
              <span>
                <i className="fa fa-file" />
              </span>
              Drag and drop an image here or click to upload.
            </div>
            <div className="preview-image-container">
              {(image || originalUrl) && (
                <img
                  src={image || originalUrl.url}
                  alt=""
                  className="preview-image"
                />
              )}
            </div>
            {revoke && image && (
              <div className="revoke-image" onClick={revokeImage}>
                <img src={icon_reverse} alt="reverse" />
              </div>
            )}
          </label>
          <input
            type="file"
            hidden
            id="hinhAnhs"
            name="hinhAnhs"
            multiple={multiple}
            onChange={handleImageChange}
          />
        </div>
      </div>
    </>
  );
}

export default PreviewImage;
