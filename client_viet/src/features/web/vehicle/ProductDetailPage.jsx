import { useLoaderData, useParams } from "react-router-dom";

import RentalInfomation from "@/features/web/vehicle/components/RentalInfomation";
import RelatedProduct from "@/features/web/vehicle/components/RelatedProduct";
import RentPolicy from "@/features/web/vehicle/components/RentPolicy";
import Utils from "@utils/Utils";
// import SelectField from "@comps/form/SelectField";
// import { useMemo, useState } from "react";
import AddCartButton from "./components/AddCartButton";

function ProductDetailPage() {
  const xe = useLoaderData();
  // const { id } = useParams();
  // const [chooseBSX, setChooseBSX] = useState();
  const getImage = () => {
    if (!xe?.hinhAnhs || xe.hinhAnhs.length == 0) {
      return "";
    }
    return xe.hinhAnhs[0].url;
  };
  // const chooseBienSoXe = (name, value) =>{
  //   setChooseBSX(value);
  // }
  // const BienSoXeList = useMemo(() =>{
  //   if (!xe || xe.bienSoXes.length == 0) return false;
  //   if (
  //     xe &&
  //     xe.bienSoXes.every((item) => item.dang_thue || !item.tinh_trang)
  //   ) {
  //     return false;
  //   }
  //   const filtered = xe.bienSoXes.filter((item) => !item.dang_thue && item.tinh_trang);
  //   // lấy giá trị ban đầu cho "chooseBSX"
  //   setChooseBSX(filtered[0].bien_so);
  //   return filtered;
  // }, [xe]);
  return (
    <>
      <div className="fade-in main-content">
        <div className="product-container">
          <div className="product-img">
            <img src={getImage()} alt="" />
          </div>
          <div className="product-content">
            <h3 className="product-name">{xe?.ten_xe}</h3>
            <div className="share-zalo">
              <button>
                <svg
                  width="20"
                  height="20"
                  version="1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  enableBackground="new 0 0 48 48"
                >
                  <path
                    fill="#1976D2"
                    d="M38.1,31.2L19.4,24l18.7-7.2c1.5-0.6,2.3-2.3,1.7-3.9c-0.6-1.5-2.3-2.3-3.9-1.7l-26,10C8.8,21.6,8,22.8,8,24 s0.8,2.4,1.9,2.8l26,10c0.4,0.1,0.7,0.2,1.1,0.2c1.2,0,2.3-0.7,2.8-1.9C40.4,33.5,39.6,31.8,38.1,31.2z"
                  />
                  <g fill="#1E88E5">
                    <circle cx="11" cy="24" r="7" />
                    <circle cx="37" cy="14" r="7" />
                    <circle cx="37" cy="34" r="7" />
                  </g>
                </svg>
                <span>Chia sẻ</span>
              </button>
            </div>
            <div className="product-price">
              <span>Giá từ :</span>{" "}
              <span className="price">{Utils.convertToVND(xe?.gia_thue)}</span>
            </div>
            <div className="basic-info">
              <div className="procedure-info">
                <span>
                  ☑️Thủ Tục : CCCD đủ 18 Hoặc giấy tờ tùy thân khác có ảnh (GPLX
                  , Pastport...) <span style={{ color: "red" }}>☎</span>{" "}
                  Hotline: 0908.428.642 (a. Quang) / 0366.367.919 (a. Chiêu) /
                  0908.630.065 (a. Hạnh)
                </span>
              </div>
            </div>
            <></>
            {/* {BienSoXeList == false && (
              <em style={{ color: "red" }}>Không sẵn cho thuê</em>
            )}
            {BienSoXeList && (
              <SelectField
                items={BienSoXeList}
                displayName={"bien_so"}
                name={"bien_so"}
                value={"bien_so"}
                label={"Biển số xe"}
                onChange={chooseBienSoXe}
              />
            )} */}
            <div className="product-action">
              {/* <button className="add-cart-btn" onClick={addCartItem}>
                Thuê ngay
              </button> */}
              <AddCartButton vehicle={xe} />
              <button className="book-btn">Đặt xe trước</button>
            </div>
            <RentPolicy />
          </div>
          <div className="rental-information">
            <RentalInfomation />
            <div className="other-product">
              <h3>Có Thể Bạn Sẽ Thích</h3>
              <RelatedProduct
                category={xe && xe.ma_loai}
                brand={xe && xe.ma_hang}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;
