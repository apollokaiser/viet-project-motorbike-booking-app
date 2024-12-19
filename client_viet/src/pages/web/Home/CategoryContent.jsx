import { useEffect, useState } from "react";
import CategoryService from "@/services/CategoryService";
import { useSearchParams } from "react-router-dom";
function CategoryContent() {
  const [params, setParams] = useSearchParams();
  const [loaiXe, setLoaiXe] = useState(null);
  const [chooseCategory, setChooseCategory] = useState(params.get("loai") || "TG");
  useEffect(() => {
    CategoryService.getCategories().then((result) => {
      setLoaiXe(result);
    });
  }, []);
  const changeCategory = (ma_loai) => {
    setParams(pre => {
      const newParams = new URLSearchParams(pre);
      newParams.set("loai", ma_loai);
      return newParams;
    });
    setChooseCategory(ma_loai);
  };
  return (
    <>
      <div className="main-title">Chọn dòng xe</div>
      <div className="product-type-option">
        <ul>
          {loaiXe &&
            loaiXe.map((loai) => (
              <li
                onClick={() => changeCategory(loai.ma_loai)}
                key={loai.ma_loai}
                className={`product-type-option-item ${
                  chooseCategory == loai.ma_loai ? "active" : ""
                }`}
              >
                {loai.ten_loai}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default CategoryContent;
