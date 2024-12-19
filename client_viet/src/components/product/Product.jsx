import { NavLink } from "react-router-dom";
import Utils from "@utils/Utils";

function Product({ product }) {
  const getIntroImage = () => {
    if (!product.hinhAnhs || product.hinhAnhs.length == 0) {
      return "";
    }
    return product.hinhAnhs[0].url;
  };
  return (
    <>
      <div className="product-item">
        <div className="product-image">
          <img src={getIntroImage()} alt="" />
        </div>
        <div className="product-info">
          <NavLink
            to={`/chi-tiet-xe/${product.ma_xe}`}
            className="product-name"
          >
            {product.ten_xe}
          </NavLink>
          <div className="product-price">
            <span>Giá từ :</span>
            <span className="price" />
            {Utils.convertToVND(product.gia_thue)}
          </div>
        </div>
      </div>
    </>
  );
}
export default Product;
