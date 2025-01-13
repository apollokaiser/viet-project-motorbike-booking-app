import "./product.css"
import "./data-table.css"

import { Outlet } from "react-router-dom";

function ProductPage() {
    return (<>
    <Outlet />
    </>);
}

export default ProductPage;