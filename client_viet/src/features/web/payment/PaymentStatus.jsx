import { Outlet } from "react-router-dom";
import "./payment.css";
function PaymentStatus() {
    return ( <>
        <div className="container">
            <Outlet />
        </div>
    </>);
}

export default PaymentStatus;