import Link from "@comps/Link";
import { useEffect, useState } from "react";

function OrderFail() {
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);
    if (counter === 0) {
      clearInterval(timer);
      window.location.href = "/";
    }
    return () => clearInterval(timer);
  }, [counter]);
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="message-box _success _failed">
            <i className="fa fa-times-circle" aria-hidden="true" />
            <h2> Your payment failed </h2>
            <p> Try again later </p>
            <Link to={"/"}>
              <button className="btn-back">
                Continue Shopping ({counter}s)
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderFail;
