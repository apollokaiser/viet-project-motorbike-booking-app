import { useEffect, useState } from "react";

import ProductService from "@/services/ProductService";
import Utils from "@utils/Utils";
import Link from "@comps/Link";

function RelatedProduct({ category, brand }) {
  const [relatedProduct, setRelatedProduct] = useState([]);
  useEffect(() => {
    ProductService.getRelatedProduct(category, brand).then((result) => {
      setRelatedProduct(result.data);
    });
  }, [category, brand]);
  return (
    <>
      <div className="other-product-list">
        {relatedProduct.length &&
          relatedProduct.map((product) => (
            <Link key={product.ma_xe} to={`/chi-tiet-xe/${product.ma_xe}`}>
            <div className="other-product-item">
              <div className="other-product-image">
                <img src={product.hinhAnhs[0]?.url} alt="" />
              </div>
              <div className="other-product-info">
                <div className="product-name">{product.ten_xe}</div>
                <div className="product-price">
                  <span>Giá từ: </span>{Utils.convertToVND(product.gia_thue)}
                </div>
              </div>
            </div>
            </Link>
          ))}
      </div>
    </>
  );
}

export default RelatedProduct;
