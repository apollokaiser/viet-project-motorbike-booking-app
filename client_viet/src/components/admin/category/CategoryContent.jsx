import "./category.css";
import { useEffect, useState } from "react";

import ListContent from "./ListContent";
import AddCategoryDialog from "./AddCategoryDialog";
import Alert from "@utils/Alert";

import CategoryService from "@/services/CategoryService";

function CategoryContent() {
  const [catetgories, setCategories] = useState([]);
  useEffect(() => {
    CategoryService.getCategories().then((result) => {
      if (result) setCategories(result);
    });
  }, []);
  const getListContent = () => {
    // chuyển đổi thành 1 list [{id:..., name: ...},...]
    return catetgories.map((category) => {
      const { ma_loai: id, ten_loai: name } = category;
      return { id, name };
    });
  };
  const handleAddCategory = (category) => {
    setCategories([...catetgories, category]);
  };
  const handleDeleteCategory = async (id) => {
    const result = await CategoryService.deleteCategory(id);
    if (result) {
      Alert.showToast("Xóa thành công", "success");
      setCategories((pre) => pre.filter((cat) => cat.ma_loai != id));
    } else {
      Alert.showToast("Xóa thất bại", "error");
    }
  };
  const handleUpdateCategory = async (id, newValue) => {
    const result = await CategoryService.updateCategory(id, newValue);
    if (result) {
      Alert.showToast("Cập nhật thành công", "success");
      setCategories((pre) =>
        pre.map((cat) =>
          cat.ma_loai === id ? { ...cat, ten_loai: newValue } : cat
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
            <span>Loại xe</span>
            <AddCategoryDialog handleAddCategory={handleAddCategory} />
          </h3>
          <ListContent
            items={getListContent()}
            handleDelete={handleDeleteCategory}
            handleUpdate={handleUpdateCategory}
          />
        </div>
      </aside>
    </>
  );
}

export default CategoryContent;
