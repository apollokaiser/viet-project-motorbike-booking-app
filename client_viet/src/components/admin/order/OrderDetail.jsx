import "./order.css";
import { useContext, useEffect, useState } from "react";
import { OrderStatus } from "../context/Context";
import Utils from "@utils/Utils";
import OrderService from "@/services/OrderSerivce";
import Alert from "@utils/Alert";
import Swal from "sweetalert2";
import DeliveriedConfimDialog from "./DeliveriedConfimDialog";

function OrderDetail({ id, handle }) {
  const [order, setOrder] = useState({});
  const { formatStatus } = useContext(OrderStatus);

  const [thisStatus, setThisStatus] = useState(null);
  useEffect(() => {
    OrderService.getOrderDetail(id).then((result) => {
      if (result) {
        setOrder(result);
        setThisStatus(formatStatus(result.tinh_trang_thue));
      }
    });
  }, [id]);
  const updateOrderToDelivered = async (theChan) => {
    const response = await OrderService.changeOrderStatus(id, 3, theChan); // 3 là trạng thái đã giao
    if (response) {
      Alert.showToast(
        "Đã giao hàng xe thành công.",
        "success",
        3000,
        document.querySelector(".MuiDialog-root")
      );
      setOrder((prevOrder) => {
        return { ...prevOrder, tinh_trang_thue: 3 };
      });
      handle(true);
      setThisStatus(formatStatus(3));
      return;
    }
    Alert.showToast("Có lỗi xảy ra. Vui lòng thử lại", "error");
  };
  const updateOrderToFinished = () => {
    //code something
  };
  const updateOrderToDeleted = async () => {
    const response = await OrderService.changeOrderStatus(id, 4); // 4 là trạng thái hủy đơn
    if (response) {
      Alert.showToast("Đã hủy thành công.", "success");
      setOrder((prevOrder) => {
        return { ...prevOrder, tinh_trang_thue: 4 };
      });
      handle(true);
      setThisStatus(formatStatus(3));
      return;
    }
    Alert.showToast("Có lỗi xảy ra. Vui lòng thử lại", "error");
  };
  const checkStatus = () => {
    return order?.tinh_trang_thue < 2
      ? "un-confirmed"
      : order?.tinh_trang_thue == 5
      ? "destroyed"
      : "confirmed";
  };
  return (
    <>
      <div className="order-container">
        <div className="order-main">
          <div className="order-content">
            <div className="order-product">
              <div className="order-info">
                <div className="order-status">
                  <span className="order-date">
                    {Utils.formatDate(order?.ngay_bat_dau_thue)}
                  </span>
                  <span className="order-date">
                    {Utils.formatDate(order?.ngay_tra)}
                  </span>
                  <span className="order-identity">{order?.ma_don_dat}</span>
                  {/* <span className="order-payment-method">????</span> */}
                  <span className={"order-status-text " + checkStatus()}>
                    {thisStatus || "Không xác định"}
                  </span>
                </div>
                <div className="order-delete-button">
                  <a onClick={updateOrderToDeleted}>Hủy đơn</a>
                </div>
              </div>

              <div className="order-list-product">
                <table className="product-table">
                  <tbody>
                    {order?.detail &&
                      order.detail.map((item) => (
                        <tr key={item.bien_so}>
                          <td className="image">
                            <img src={item?.url} alt="motobike" />
                          </td>
                          <td className="title">
                            <div>{item.ten_xe}</div>
                            <div>{item.ma_xe}</div>
                          </td>
                          <td className="quantity">{item.bien_so}</td>
                          <td className="price">
                            {Utils.convertToVND(item.gia_tien)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <hr />
                <table className="order-total">
                  <tbody>
                    <tr>
                      <td>Tổng giá trị</td>
                      <td>{Utils.convertToVND(order?.tong_tien)}</td>
                    </tr>
                    <tr>
                      <td>Vận chuyển</td>
                      <td>{Utils.convertToVND(order?.phi_giao_xe)}</td>
                    </tr>
                    <tr>
                      <td>Tổng thuê</td>
                      <td>{Utils.convertToVND(order?.tong_thue)}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Còn nợ</strong>
                      </td>
                      <td>
                        {!order?.da_giao_tien
                          ? Utils.convertToVND(order.tong_thue)
                          : "0đ"}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {order?.tinh_trang_thue < 3 && (
                  <div className="order-action">
                    <DeliveriedConfimDialog handle={updateOrderToDelivered} />
                  </div>
                )}
                {order?.tinh_trang_thue == 3 && (
                  <div onClick={(e) => console.log(e)} className="order-action">
                    <button className="order-finished">Hoàn thành</button>
                  </div>
                )}
              </div>
            </div>
            <div className="order-payment-info">
              <div
                className="order-payment-method"
                style={{ textDecoration: "line-through" }}
              >
                <div>
                  <strong>Phương thức thanh toán</strong>
                </div>
                <div>VNPAY</div>
                <div>10.000.000đ</div>
              </div>
              <div className="billing-address">
                <div>
                  <strong>Địa chỉ thanh toán</strong>
                </div>
                <div>{order?.dia_chi_nhan}</div>
              </div>
            </div>
          </div>
          <div className="order-note-shipping">
            <div className="customer-note">
              <div>
                <strong>Ghi chú của khách hàng</strong>
              </div>
              {order?.yeu_cau || "Không"}
            </div>
            <div className="customer-info">
              <div>
                <strong>Thông tin khách hàng</strong>
              </div>
              <div>
                Số điện thoại: <span>{order?.sdt}</span>
              </div>
              <div>
                Họ tên người nhận: <span>{order?.ten_nguoi_nhan}</span>
              </div>
              <div>
                Địa chỉ người nhận: <span>{order?.dia_chi_nhan}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetail;
