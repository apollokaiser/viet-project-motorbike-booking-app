import ProductService from "@/services/ProductService";
import Product from "@comps/product/Product";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function ProductContent() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState(null);
  const type = params.get("loai");
  useEffect(() => {
    ProductService.getAllBikes(type || "TG").then((result) => {
      setProducts(result.data);
    });
  }, [type]);
  return (
    <>
      <div className="product-list">
        {products &&
          products.map((product) => (
            <Product key={product.ma_xe} product={product} />
          ))}
        <div className="load-all">
          <button>Xem tất cả</button>
        </div>
      </div>
    </>
  );
}

export default ProductContent;
