import Link from "@comps/Link";
import { useEffect, useState } from "react";
function OrderSuccess() {
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
          <div className="message-box _success">
            <i className="fa fa-check-circle" aria-hidden="true" />
            <h2> Your payment was successful </h2>
            <p>
              {" "}
              Thank you for your payment. we will <br />
              be in contact with more details shortly{" "}
            </p>
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

export default OrderSuccess;
