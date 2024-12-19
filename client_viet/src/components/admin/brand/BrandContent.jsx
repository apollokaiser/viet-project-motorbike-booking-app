import "../category/category.css";
import { useEffect, useState } from "react";

import ListContent from "../category/ListContent";
import AddBrandDialog from "./AddBrandDialog";
import Alert from "@utils/Alert";

import BrandService from "@/services/BrandService";

function BrandContent() {
  const [brands, setBrands] = useState([]);
  useEffect(() => {
   BrandService.getBrands().then((result) => {
      if (result) {
        setBrands(result);
      }
    });
  }, []);
  const getListContent = () => {
    return brands.map((brand) => {
      const { ma_hang: id, ten_hang: name } = brand;
      return { id, name };
    });
  };
  const handleAddBrand = (newBrand) => {
    setBrands([...brands, newBrand]);
  };
  const handleDeleteBrand = async (id) => {
    const result = await BrandService.deleteBrand(id);
    if (result) {
      Alert.showToast("Xóa thành công", "success");
      setBrands((pre) => pre.filter((brand) => brand.ma_hang != id));
    } else {
      Alert.showToast("Xóa không thành công", "error");
    }
  };
  const handleUpdateBrand = async (id, newValue) => {
    const result = await BrandService.updateBrand(id, newValue);
    if (result) {
      Alert.showToast("Cập nhật thành công", "success");
      setBrands((pre) =>
        pre.map((brand) =>
          brand.ma_hang === id ? { ...brand, ten_hang: newValue } : brand
        )
      );
    } else {
      Alert.showToast("Cập nhật thất bại", "error");
    }
  };
  return (
    <>
      <aside className="col-sm-4 col-md-3 content-aside" id="column-left">
        <div className="module category-style">
          <h3 className="modtitle">
            <span>Hãng xe</span>
            <AddBrandDialog handleAddBrand={handleAddBrand} />
          </h3>
          <ListContent
            items={getListContent()}
            handleDelete={handleDeleteBrand}
            handleUpdate={handleUpdateBrand}
          />
        </div>
      </aside>
    </>
  );
}

export default BrandContent;
