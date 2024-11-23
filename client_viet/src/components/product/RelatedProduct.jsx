import { getRelatedProduct } from "@/apis/getData";
import relationship_image from "@/assets/img/product/avatar-honda-rsx-8999.jpg";
import convertToVND from "@/utils/convertVND";
import Link from "@comps/Link";
import { useEffect, useState } from "react";

function RelatedProduct({ category, brand }) {
  const [relatedProduct, setRelatedProduct] = useState([]);
  useEffect(() => {
    getRelatedProduct(category, brand).then((result) => {
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
                  <span>Giá từ: </span>{convertToVND(product.gia_thue)}
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
