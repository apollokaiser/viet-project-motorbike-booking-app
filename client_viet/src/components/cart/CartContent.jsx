import convertToVND from "@/utils/convertVND";
import CartItem from "./CartItem";
import Payment from "./Payment";

function CartContent({cart}) {
  const totalPrice = () =>{
    console.log(cart.transport_fee);
    let transport_fee = Number(cart.transport_fee.phi_van_chuyen ||0)
    return transport_fee + cart.total;
  }
    return ( <>
        <div className="cart-content">
        <div className="cart-list">
          <h3>Giỏ hàng của bạn</h3>
          <div className="cart-header">
            <div className="cart-item-img">Hình ảnh</div>
            <div className="cart-item-name">Thông tin xe</div>
            <div className="cart-item-quatity">Số lượng</div>
            <div className="cart-item-price">Thành tiền</div>
          </div>
          {cart.items.length > 0 &&
            cart.items.map((motobike) => (
              <CartItem key={motobike.id} item={motobike} />
            ))}
          <div className="provisional-value">
            <span>Tạm tính</span>
            <span>{convertToVND(cart.total)}</span>
          </div>
          <div className="provisional-value">
            <span>Phí vận chuyển</span>
            <span>{convertToVND(cart.transport_fee.phi_van_chuyen || 0)}</span>
        </div>
          <div className="total-value">
            <span>Tổng tiền</span>
            <span>{convertToVND(totalPrice())}</span>
          </div>
        </div>
        <Payment />
      </div>
    </> );
}

export default CartContent;