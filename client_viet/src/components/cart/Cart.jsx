import { useSelector, useDispatch } from "react-redux";
import NoCart from "./NoCart";
import { useEffect } from "react";
import { getCartDetails } from "@/apis/getData";
import { addDetails } from "@/redux/cart/cartSplice";
import CartContent from "./CartContent";
function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    if (cart.items.length > 0)
      getCartDetails(cart.items).then((result) => {
        dispatch(addDetails(result.data));
      });
  }, []);
  return (
    <>
      <div className="fade-in main-content">
        <div className="cart-container">
          {!cart.items.length ? <NoCart /> : <CartContent cart={cart} />}
        </div>
      </div>
    </>
  );
}

export default Cart;
