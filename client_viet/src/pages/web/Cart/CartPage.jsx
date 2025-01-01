import { addDetails } from "@/redux/cart/cartSplice";
import CartService from "@/services/CartService";
import CartContent from "@comps/cart/CartContent";
import NoCart from "@comps/cart/NoCart";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function CartPage() {
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

export default CartPage;