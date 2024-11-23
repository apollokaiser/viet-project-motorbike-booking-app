import PAYMENT_METHOD from "@/utils/PaymentMethod";

function PaymentMethod({changeMethod, currentMethod}) {
    return (<>
        <div className="payment-method">
          <div className="payment-form">
            {PAYMENT_METHOD.map((method, index) => (
              <div key={method.id}>
                <input
                  id={`radio ${index}`}
                  type="radio"
                  name="option"
                  value={method.id}
                  checked={currentMethod == method.id}
                  onChange={changeMethod}
                />
                <label htmlFor={`radio ${index}`}>{method.title}</label>
              </div>
            ))}
          </div>
        </div>
    </>);
}

export default PaymentMethod;