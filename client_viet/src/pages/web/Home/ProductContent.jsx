import ProductService from "@/services/ProductService";
import Loading from "@comps/loader/Loading";
import Product from "@comps/product/Product";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function ProductContent() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const type = params.get("loai");
  useEffect(() => {
    setLoading(true);
    ProductService.getAllBikes(type || "TG").then((result) => {
      setLoading(false);
      setProducts(result.data);
    });
  }, [type]);
  return (
    <>
      {loading && <Loading />}
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
