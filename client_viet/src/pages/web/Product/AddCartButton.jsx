import { addCart } from "@/redux/cart/cartSplice";
import Alert from "@utils/Alert";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AddCartButton({ id, bienSoXe }) {
  const [openPopup, setOpenPopup] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const addCartItem = () => {
    if (
      cart.items.find((item) => item.id == id && item.bienSoXe == bienSoXe)
    ) {
      Alert.showToast("Xe đã thêm vào giỏ hàng !", "info", 1500);
      return;
    }
    setOpenPopup(true);
    setTimeout(() => setOpenPopup(false), 1000);
    dispatch(
      addCart({
        id,
        bienSoXe,
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
