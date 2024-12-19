import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addDetails } from "@/redux/cart/cartSplice";
import CartService from "@/services/CartService";
import CartContent from "./CartContent";
import NoCart from "./NoCart";
function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    if (cart.items.length > 0)
     CartService.getCartDetails(cart.items).then((result) => {
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
