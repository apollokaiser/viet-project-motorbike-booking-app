import AddProductDialog from "./AddProductDialog";
import increasingIcon from "@assets/img/sort-increasing.png";
import descendingIcon from "@assets/img/descending-sorting.png";
import { useSearchParams } from "react-router-dom";
function ProductContentToolbar() {
  const [params, setParams] = useSearchParams();
  const changeSortCondition = () => {
    setParams((pre) => {
      const newURLParams = new URLSearchParams(pre);
      newURLParams.set("sort", pre.get("sort") == "asc" ? "desc" : "asc");
      return newURLParams;
    });
  };
  const changeFilterCondition = (e) => {
    setParams((pre) => {
      const newURLParams = new URLSearchParams(pre);
      newURLParams.set("filter", e.target.value);
      return newURLParams;
    });
  };
  const changeSearchCondition = (e) => {
    if (e.key == "Enter") {
      setParams((pre) => {
        const newURLParams = new URLSearchParams(pre);
        if (e.target.value.trim() == "") {
          newURLParams.delete("search");
          return newURLParams;
        }
        newURLParams.set("search", e.target.value);
        return newURLParams;
      });
    }
  };
  return (
    <>
      <div className="toolbar">
        <div className="filters">
          <div className="filter-options-wrapper">
            <label htmlFor="filter-options" className="filter-label">
              Lọc
            </label>
            <select
              onChange={changeFilterCondition}
              name="filter-options"
              id="filter-options"
            >
              <option selected value="ma_xe">
                ID
              </option>
              <option value="ten_xe">Tên xe</option>
              <option value="bien_so">Biển số</option>
              <option value="phan_khoi">Phân khối</option>
              <option value="gia_thue">Giá thuê</option>
              <option value="co_san">Sẵn có</option>
              <option value="the_chan">Thế chân</option>
              <option value="ten_loai">Loại xe</option>
              <option value="ten_hang">Hãng xe</option>
            </select>
          </div>
          <div className="filter-options-wrapper">
            <label
              onClick={changeSortCondition}
              htmlFor="filter-options"
              className="filter-label"
            >
              <img
                style={{ cursor: "pointer" }}
                src={
                  params.get("sort") == "asc" ? increasingIcon : descendingIcon
                }
                alt="sort"
                title={params.get("sort") == "asc" ? "Tăng dần" : "Giảm dần"}
              />
            </label>
          </div>
          <div className="search">
            <input
              type="text"
              onKeyUp={changeSearchCondition}
              id="search-text"
              name="search-text"
              placeholder="Tìm kiếm..."
            />
          </div>
        </div>
        <AddProductDialog />
      </div>
    </>
  );
}

export default ProductContentToolbar;
