import SettingService from "@/services/SettingService";
import Loading from "@comps/loader/Loading";
import Alert from "@utils/Alert";
import uploadImages from "@utils/uploadImage";
import Utils from "@utils/Utils";
import { useEffect, useState } from "react";

function DescriptionSetting() {
  const [webDescription, setWebDescription] = useState("");
  const [uploadIcon, setUploadIcon] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    Promise.all([
      SettingService.getAttribute("web_title").catch((error) => null),
      SettingService.getAttribute("web_icon").catch((error) => null),
      SettingService.getAttribute("tag_line").catch((error) => null),
    ]).then(([title, icon, tagline]) => {
      if (title) setWebDescription((pre) => ({ ...pre, title }));
      if (icon) setWebDescription((pre) => ({ ...pre, icon }));
      if (tagline) setWebDescription((pre) => ({ ...pre, tagline }));
    });
  }, []);
  const uploadWebIcon = (e) => {
    setUploadIcon(e.target.files[0]);
  };
  const handleChange = (e) => {
    setWebDescription((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const updateAttributes = async (e) => {
    e.preventDefault();
    let attrs = {
      web_title: webDescription?.title,
      tag_line: webDescription?.tagline,
    };
    setIsLoading(true);
    if (uploadIcon) {
      const modifiedImage = Utils.renameFile(uploadIcon,"web_icon");;
      const imageupload = await uploadImages(modifiedImage);
      attrs.web_icon = imageupload?.secureUrl;
      attrs.web_icon_publicId = imageupload?.publicId;
    }

    const result = await SettingService.updateAttributes(attrs);
    setIsLoading(false);
    if (attrs.web_icon)
      setWebDescription((pre) => ({ ...pre, icon: attrs.web_icon }));
    if (result) Alert.showSuccess("Cập nhật thành công");
    else if (result == false) Alert.showError("Cập nhật thất bại");
    else Alert.showError("Có lỗi cập nhật ! Thử lại");
  };
  return (
    <>
      <div id="myTabContent" className="tab-content col-xs-6">
        <div className="tab-pane active in">
          <h4 className="border-bottom">Thông tin mô tả</h4>
          <form>
            <ul className="list">
              <li>
                <label htmlFor="id_title">Tên website:</label>{" "}
                <input
                  id="id_title"
                  className="form-control"
                  maxLength={200}
                  name="title"
                  type="text"
                  value={webDescription?.title}
                  onChange={handleChange}
                />
              </li>
              <li>
                <label htmlFor="id_tagline">Tagline:</label>{" "}
                <input
                  id="id_tagline"
                  className="form-control"
                  maxLength={200}
                  name="tagline"
                  type="text"
                  value={webDescription?.tagline}
                  onChange={handleChange}
                />
              </li>
              <li>
                <label htmlFor="id_favicon">Biểu tượng:</label>{" "}
                <input
                  onChange={uploadWebIcon}
                  id="id_favicon"
                  name="favicon"
                  type="file"
                  accept=".ico, image/*"
                />{" "}
                <span className="helptext">Upload .ico, image file</span>
              </li>
              <li>
                <input
                  type="submit"
                  className="btn btn-default"
                  name="submit"
                  value="Save changes"
                  onClick={updateAttributes}
                />
                <input
                  type="submit"
                  className="btn btn-default"
                  name="submit"
                  value="Cancel"
                />
              </li>
            </ul>
          </form>
          {isLoading && <Loading title={"Đang cập nhật ..."} />}
        </div>
      </div>
      <div className="preview-web-icon col-xs-3">
        <div className="tab-pane active in">
          <h4 className="border-bottom">Logo</h4>
          <div className="web-icon-border">
            {webDescription?.icon && (
              <img
                className="web-icon-img"
                src={webDescription?.icon}
                alt="web icon"
              />
            )}
            {
              !webDescription?.icon && (
                <em style={{ color: "red" }}>Chưa tồn tại</em>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default DescriptionSetting;
