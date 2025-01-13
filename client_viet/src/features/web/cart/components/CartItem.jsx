import delete_cart from "@assets/img/icons-delete.png";

import { removeCart, addQuantity,addCart,reduceQuantity } from "@/features/web/cart/redux/cartSplice";
import { useDispatch } from "react-redux";
import Utils from "@utils/Utils";
import Alert from "@utils/Alert";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const getPrice = (money) => {
    return Utils.convertToVND(money);
  };
  const deleteCart = () => {
    dispatch(removeCart({ id: item.id }));
  };
  // const handleChangeBienSoXe = (e) => {
  //   dispatch(
  //     changeBienSoXe({
  //       id: item.id,
  //       bienSoXe: e.target.value,
  //       oldBSX: item.bienSoXe,
  //     })
  //   );
  // };
  const decrement = () => {
    if (item.quantity > 1) {
      dispatch(reduceQuantity({ id: item.id }));
    }
  };
  const increment = () => {
    console.log("increasing",item.detail?.co_san);
    if (item.quantity < item.detail?.co_san) {
      dispatch(addCart({ id: item.id, quantity: 1 }));
    } else {
      Alert.showToast("Số lượng xe đã đến giới hạn","info",1500 );
    }
  };
  const updateQuantity = (e) => {
    let quantity = e.target.value;
    if (quantity < 0 || quantity > item.detail.co_san) {
      toast.fire({
        icon: "info",
        title: "Số lượng không hợp lệ",
        timer: 1500,
      });
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
            {/* <select
              onChange={handleChangeBienSoXe}
              value={item.bienSoXe}
              name="bien_so"
              id="bien_so"
            >
              {item.detail?.bienSoXes.map((bienSo) => (
                <option key={bienSo.bien_so} value={bienSo.bien_so}>
                  {bienSo.bien_so}
                </option>
              ))}
            </select> */}
          </div>
        </div>
        <div className="cart-item-price">
          <p>{getPrice(item.detail?.gia_thue)}</p>
        </div>
        <div className="cart-item-remove">
          <button onClick={deleteCart} className="remove">
            <img src={delete_cart} alt="" title="Xóa" />
          </button>
        </div>
      </div>
    </>
  );
}

export default CartItem;
