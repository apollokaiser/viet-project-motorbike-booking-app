import PaymentService from "@/services/PaymentService";
import { useEffect, useState } from "react";

function PaymentMethod({changeMethod, currentMethod}) {
const [paymentMethod, setPaymentMethod] = useState();

  useEffect(() => {
    PaymentService.getPaymentMethods().then(result =>{
      if(result)
      setPaymentMethod(result);
    })
  }, []);
    return (<>
        <div className="payment-method">
          <div className="payment-form">
            {paymentMethod && paymentMethod.map((method, index) => (
              <div key={method.ma_thanh_toan}>
                <input
                  id={`radio ${index}`}
                  type="radio"
                  name="option"
                  value={method.ma_thanh_toan}
                  checked={currentMethod == method.ma_thanh_toan}
                  onChange={changeMethod}
                />
                <label htmlFor={`radio ${index}`}>{method.ten_thanh_toan}</label>
              </div>
            ))}
          </div>
        </div>
    </>);
}

export default PaymentMethod;