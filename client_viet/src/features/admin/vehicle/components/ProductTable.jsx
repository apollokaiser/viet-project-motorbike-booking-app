import { useEffect, useMemo, useState } from "react";
import NoProduct from "./NoProduct";
import ProductActions from "./ProductActions";
import Utils from "@utils/Utils";
import { useSearchParams } from "react-router-dom";
import ProductService from "@/services/ProductService";
import LicensePlate from "./LicensePlate";

function ProductTable() {
  const [bikes, setBikes] = useState([]);
  const [params, setParams] = useSearchParams();
  useEffect(() => {
   ProductService. getAllBikeDatas().then((result) => {
      if (result) {
        setBikes(result);
      }
    });
  }, []);
  const filter = params.get("filter");
  const sort = params.get("sort");
  const search = params.get("search");
  const sortData = useMemo(() => {
    const sortBikes = Utils.sortObjects(
      bikes,
      filter,
      search,
      sort == "asc"
    );
    return sortBikes;
  },[filter,search,sort,bikes]);
  const handleDeleteProduct = (id, mode) => {
    if (bikes.length > 0 && mode == 0) {
      setBikes(bikes.filter((bike) => bike.ma_xe !== id));
    } else if (bikes.length > 0 && mode == 1) {
      setBikes((prev) =>
        prev.map((bike) => {
          if (bike.ma_xe === id) {
            return { ...bike, tinh_trang_xe: false };
          }
          return bike;
        })
      );
    }
  };
  const handleActiveProduct = (id) =>{
    if (bikes.length > 0) {
      setBikes(prev =>
        prev.map(bike => {
          if (bike.ma_xe === id) {
            return {...bike, tinh_trang_xe: true };
          }
          return bike;
        })
      );
    }
  }
  // code here ...
  const handleShowLP = (id) =>{
    setParams(pre=> {
      const newParams = new URLSearchParams(pre);
      newParams.set("v_id", id);
      return newParams;
    })
  }
  return (
    <>
      <div className="table-container">
        {/* No Product */}
        {sortData.length === 0 && <NoProduct />}
        {
          sortData.length > 0 && (
            <table className="table" id="data-table">
          <ProductTableHeader />
          <tbody id="table-body">
            {sortData.length > 0 &&
              sortData.map((bike) => (
                <tr
                  style={{
                    background: bike.tinh_trang_xe == 1 ? null : "#a5a5a5",
                    borderLeft: params.get("v_id") == bike.ma_xe? "10px solid green": ""
                  }}
                  key={bike.ma_xe}
                >
                  <td>{bike.ma_xe}</td>
                  <td style={{cursor:"pointer"}} onClick={()=> handleShowLP(bike.ma_xe)}>{bike.ten_xe}</td>
                  <td>{bike.mo_ta}</td>
                  <td>{bike.phan_khoi}</td>
                  <td>{Utils.convertToVND(bike.gia_thue)}</td>
                  <td>{bike.co_san}</td>
                  <td>{Utils.convertToVND(bike.the_chan)}</td>
                  <td>{bike.category.ten_loai}</td>
                  <td>{bike.brand.ten_hang}</td>
                  <td className="actions">
                    <ProductActions
                      bike={bike}
                      handleDelete={handleDeleteProduct}
                      handleActive={handleActiveProduct}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
          )
        }
        {
          (params.get("v_id") && params.get("v_id") !="") && <LicensePlate /> 
        }
        
      </div>
    </>
  );
}

function ProductTableHeader() {
  return (
    <>
      <thead>
        <tr>
          {/* <th className="fixed-column" /> */}
          <th className="sortable" data-id="id">
            <div className="sortable-wrapper">
              <span className="sortable-heading">ID</span>
            </div>
          </th>
          <th className="sortable" data-id="name">
            <div className="sortable-wrapper">
              <span className="sortable-heading">Tên xe</span>
            </div>
          </th>
          <th data-id="description">Description</th>
          <th className="sortable" data-id="vendor">
            <div className="sortable-wrapper">
              <span className="sortable-heading">Phân khối</span>
            </div>
          </th>
          <th className="sortable" data-id="in_stock">
            <div className="sortable-wrapper">
              <span className="sortable-heading">Giá thuê</span>
            </div>
          </th>
          <th className="sortable" data-id="buying_price">
            <div className="sortable-wrapper">
              <span className="sortable-heading">Sẵn có</span>
            </div>
          </th>
          <th className="sortable" data-id="the_chan">
            <div className="sortable-wrapper">
              <span className="sortable-heading">Thế chân</span>
            </div>
          </th>
          <th className="sortable" data-id="purchase_quantity">
            <div className="sortable-wrapper">
              <span className="sortable-heading">Loại xe</span>
            </div>
          </th>
          <th className="sortable" data-id="purchase_quantity">
            <div className="sortable-wrapper">
              <span className="sortable-heading">Hãng xe</span>
            </div>
          </th>
          <th className="actionsTH"></th>
        </tr>
      </thead>
    </>
  );
}

export default ProductTable;
