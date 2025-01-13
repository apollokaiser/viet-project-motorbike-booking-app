import ProductService from "@/services/ProductService";
import Product from "@/features/web/vehicle/components/Product";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function SearchResult() {
  const [query] = useSearchParams();
  const queryObject = Object.fromEntries(query);
  const [products, setProducts] = useState(null);
  useEffect(() => {
    queryObject.search &&
      ProductService.searchBike(queryObject.search).then((result) => {
        console.log(result);
        if (result) setProducts(result);
      });
  }, []);
  return (
    <>
      <div className="fade-in main-content">
        <div className="product-list">
          {products &&
            products.map((product) => (
              <Product
                key={product.ma_xe}
                product={product}
                image={product.url}
              />
            ))}
          <div className="load-all">
            <button>Xem tất cả</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResult;
