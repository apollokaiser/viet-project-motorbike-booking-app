import CategoryService from "@/services/CategoryService";
import "./product.css";
import ProductService from "@/services/ProductService";
import PreviewImage from "@/features/admin/vehicle/components/PreviewImage";
import SelectField from "@comps/form/SelectField";
import TextArea from "@comps/form/TextArea";
import TextInput from "@comps/form/TextInput";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BrandService from "@/services/BrandService";
import Alert from "@utils/Alert";

function UpdateProductPage() {
  const [params, setParams] = useSearchParams();
  const [product, setProduct] = useState();
  const [updateData, setUpdateData] = useState();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const id = params.get("id");
  useEffect(() => {
    if (id) {
      ProductService.getBike(id).then((result) => {
        setProduct(result.data);
        const update = { ...result.data };
        delete update.xe_ton_kho;
        delete update.hinhAnhs;
        setUpdateData(update);
      });
      CategoryService.getCategories().then((result) => {
        if (result) setCategories(result);
      });
      BrandService.getBrands().then((result) => {
        if (result) setBrands(result);
      });
    }
  }, [id]);
  const handleInput = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };
  const handleSelect = (name, value) => {
    setUpdateData({ ...updateData, [name]: value });
  };
  const handleUpload = (e, prevImg = null, revoke = false) => {
    if (revoke) {
      setUpdateData((pre) => {
        delete pre.hinhAnhs;
        delete pre.deleteImg;
        return pre;
      });
      return;
    }
    setUpdateData((pre) => {
      if (!pre.hinhAnhs || pre.hinhAnhs.length == 0) {
        pre.hinhAnhs = [];
      }
      pre.hinhAnhs.push(e.target.files[0]);
      if (prevImg) {
        // avoid null reference (hinhAnhs can be null)
        if (!pre.deleteImg || pre.deleteImg.length == 0) {
          pre.deleteImg = [];
        }
        pre.deleteImg.push(prevImg);
      }
      // pre.hinhAnhs = e.target.files;
      return pre;
    });
  };
  const handleUpdate = async () => {
    setLoading(true);
    const result = await ProductService.updateBike(updateData);
    setLoading(false);
    if (result) {
      Alert.showToast("Cập nhật thành công", "success");
      return;
    }
    Alert.showToast("Cập nhật thất bại");
  };
  return (
    <>
      <div className="uk-container">
        <div className="uk-grid">
          <PreviewImage
            originalUrl={product?.hinhAnhs[0]}
            handleUpload={handleUpload}
            revoke={true}
          />
          <div className="uk-width-1-2">
            <div className="uk-width-1-1@s">
              <h2 className="uk-text-center">Thông tin chi tiết</h2>
              <hr />
              <TextInput
                label={"Tên sản phẩm"}
                name={"ten_xe"}
                value={updateData?.ten_xe}
                onChange={handleInput}
                redoEnabled={true}
                redoValue={product?.ten_xe}
              />
              <TextInput
                label={"Biển số"}
                name={"bien_so"}
                value={updateData?.bien_so}
                onChange={handleInput}
                redoEnabled={true}
                redoValue={product?.bien_so}
              />
              <TextInput
                label={"Phân khối"}
                name={"phan_khoi"}
                value={updateData?.phan_khoi}
                onChange={handleInput}
                redoEnabled={true}
                redoValue={product?.phan_khoi}
              />
              <TextInput
                label={"Giá thuê"}
                name={"gia_thue"}
                value={updateData?.gia_thue}
                onChange={handleInput}
                redoEnabled={true}
                redoValue={product?.gia_thue}
              />
              <SelectField
                label={"Loại xe"}
                name={"ma_loai"}
                displayName={"ten_loai"}
                onChange={handleSelect}
                value={"ma_loai"}
                selected={updateData?.ma_loai}
                items={categories}
              />
              <SelectField
                label={"Hãng xe"}
                name={"ma_hang"}
                displayName={"ten_hang"}
                value={"ma_hang"}
                onChange={handleSelect}
                selected={updateData?.ma_hang}
                items={brands}
              />
              <TextArea
                name={"mo_ta"}
                label={"Mô tả"}
                onChange={handleInput}
                value={updateData?.mo_ta}
              />
            </div>
            <div className="uk-width-1-1 uk-text-center">
              <button
                onClick={handleUpdate}
                className="btn btn-primary"
                type="submit"
              >
                {loading ? "Đang cập nhật..." : "Cập nhật"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProductPage;
