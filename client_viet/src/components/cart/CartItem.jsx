import { addCart, reduceQuantity, addQuantity } from "@/redux/cart/cartSplice";
import Alert from "@/utils/Alert";
import { useDispatch } from "react-redux";
import Utils from "@utils/Utils";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const getPrice = (money, quantity) => {
    return Utils.convertToVND(money * quantity);
  };
  const decrement = () => {
    if (item.quantity > 1) {
      dispatch(reduceQuantity({ id: item.id }));
    }
  };
  const increment = () => {
    if (item.quantity < item.detail?.so_luong) {
      dispatch(addCart({ id: item.id, quantity: 1 }));
    } else {
      Alert.showToast("Sản phẩm không đủ hàng", "info", 1500);
    }
  };
  const updateQuantity = (e) => {
    let quantity = e.target.value;
    if (quantity < 0 || quantity > item.detail.so_luong) {
      Alert.showToast("Số lượng không hợp lệ", "info", 1500);
      quantity = 1;
    }
    dispatch(addQuantity({ id: item.id, quantity }));
  };
  return (
    <>
      <div className="cart-item">
        <div className="cart-item-img">
          <img src={item.detail?.hinhAnhs[0].url} alt="" />
        </div>
        <div className="cart-item-name">
          <p>{item.detail?.ten_xe}</p>
          <p>
            Mã xe: <span>{item.detail?.ma_xe}</span>
          </p>
        </div>
        <div className="cart-item-quatity">
          <div className="quantity-control">
            <button onClick={decrement} className="decrement">
              -
            </button>
            <input
              type="number"
              value={item.quantity}
              onChange={updateQuantity}
            />
            <button onClick={increment} className="increment">
              +
            </button>
          </div>
        </div>
        <div className="cart-item-price">
          <p>{getPrice(item.detail?.gia_thue, item.quantity)}</p>
        </div>
      </div>
    </>
  );
}

export default CartItem;
