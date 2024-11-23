import { Outlet } from "react-router-dom";
import "@comps/payment/payment.css";
function OrderStatus() {
    return ( <>
        <div className="container">
            <Outlet />
        </div>
    </>);
}

export default OrderStatus;