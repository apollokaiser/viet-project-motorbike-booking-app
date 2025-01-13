import { addCart } from "@/features/web/cart/redux/cartSplice";
import Alert from "@utils/Alert";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AddCartButton({ vehicle }) {
  const [openPopup, setOpenPopup] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const addCartItem = () => {
    if (!vehicle?.co_san) {
      Alert.showToast("Đã hết xe để thuê", "info", 1500);
      return;
    }
    if (cart.items.find((item) => item.id == vehicle.ma_xe)) {
      Alert.showToast("Xe đã thêm vào giỏ hàng !", "info", 1500);
      return;
    }
    setOpenPopup(true);
    setTimeout(() => setOpenPopup(false), 1000);
    dispatch(
      addCart({
        id:vehicle.ma_xe,
        quantity: 1,
      })
    );
  };
  return (
    <>
      <div style={{ position: "relative" }}>
        <button className="add-cart-btn" onClick={addCartItem}>
          Thuê ngay
        </button>
        {openPopup && <div className="cart-popup">+1</div>}
      </div>
    </>
  );
}

export default AddCartButton;
