import ProductContentToolbar from "./ProductContentToolbar";
import ProductTable from "./ProductTable";
import CategoryContent from "../category/CategoryContent";
import BrandContent from "../brand/BrandContent";
function ProductContent() {
  return (
    <>
        <main className="product-main-content">
          <div className="data-table">
            <h1 className="heading">
              <span>Quản lý xe</span>
            </h1>
            <ProductContentToolbar />
            <ProductTable />
            <div id="selected-products" className="selected-products" />
          </div>
          <div className="data-table">
            <h1 className="heading">
              <span>Quản lý khác</span>
            </h1>\
            <div style={{gap:"10px"}} className="d-flex align-items-start">
            <CategoryContent />
            <BrandContent />
            </div>
          </div>
        </main>
    </>
  );
}

export default ProductContent;
