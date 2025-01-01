import delete_cart from "@assets/img/icons-delete.png"

import { changeBienSoXe, removeCart } from "@/redux/cart/cartSplice";
import { useDispatch } from "react-redux";
import Utils from "@utils/Utils";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const getPrice = (money) => {
    return Utils.convertToVND(money);
  };
  const deleteCart = () =>{
    dispatch(removeCart({id:item.id, bienSoXe: item.bienSoXe}));
  }
  const handleChangeBienSoXe = (e) =>{
    dispatch(changeBienSoXe({
      id: item.id,
      bienSoXe: e.target.value,
      oldBSX: item.bienSoXe
    }))
  }
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
            <select onChange={handleChangeBienSoXe} value={item.bienSoXe} name="bien_so" id="bien_so">
              {item.detail?.bienSoXes.map(bienSo => (
                <option key={bienSo.bien_so} value={bienSo.bien_so}>
                  {bienSo.bien_so}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="cart-item-price">
          <p>{getPrice(item.detail?.gia_thue)}</p>
        </div>
        <div className="cart-item-remove">
          <button
            onClick={deleteCart}
            className="remove"
          >
            <img src={delete_cart} alt="" title="Xóa"/>
          </button>
        </div>
      </div>
    </>
  );
}

export default CartItem;
