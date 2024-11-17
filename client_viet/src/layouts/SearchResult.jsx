import Product from "@comps/Product";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function SearchResult() {
    const [query] = useSearchParams()
    const queryObject = Object.fromEntries(query)
    const [products, setProducts] = useState(null);
    useEffect(()=>{
       queryObject.search && searchXe(queryObject.search).then(result => {
           setProducts(result.data)
        })
    },[])
    return (<>
       <div className="fade-in main-content">
                    <div className="product-list">
                        {products && products.map(product =>
                            <Product key={product.ma_xe} product={product} />
                        )
                        }
                        <div className="load-all">
                            <button>Xem tất cả</button>
                        </div>
                    </div>
                </div>
    </>  );
}

export default SearchResult;