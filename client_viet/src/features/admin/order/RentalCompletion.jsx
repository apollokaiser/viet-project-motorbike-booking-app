import { useEffect, useRef, useState } from "react";
import "./order.css";
import logo from "@/assets/img/logo-invoice.png";
import { useSearchParams } from "react-router-dom";
import OrderService from "@/services/OrderSerivce";
import FinesCatalog from "./components/FinesCalalog";
import Utils from "@utils/Utils";
import Alert from "@utils/Alert";
function RentalCompletion() {
  const [order, setOrder] = useState();
  const [params, setParams] = useSearchParams();
  const [fineTotal, setFineTotal] = useState(0);
  const fineList = useRef();
  const orderId = params.get("id");
  useEffect(() => {
    OrderService.getOrderDetail(orderId).then((result) => {
      setOrder(result);
    });
  }, []);
  const getFines = (value, items) => {
    setFineTotal((pre) => {
      pre += Number.parseInt(value);
      return pre;
    });
    fineList.current = items;
  };
  const rentalCompletionHandle = async () => {
    const bill = {
      ma_don_dat: order.ma_don_dat,
      ngay_lap_hd: new Date().getTime() / 1000,
      so_tien_tt: fineTotal,
    };
    //call api
    const result = await OrderService.rentalComletion(bill, fineList.current);
    if (result) {
      Alert.showAlertDialog(
        "Hoàn tất đơn thuê xe",
        "Đơn thuê đã được thực hiện hoàn tất",
        "success"
      );
      return;
    }
    Alert.showAlertDialog("Thất bại", "Đơn thuê đang gặp lỗi", "error");
  };
  return (
    <>
      <section className="wrapper-invoice">
        <div className="invoice">
          <div className="invoice-information">
            <p>
              <b>Mã đơn thuê #</b> : <span>{order?.ma_don_dat}</span>
            </p>
            <p>
              <b>Từ ngày </b>:{" "}
              <span>{Utils.formatDate(order?.ngay_bat_dau_thue)}</span>
            </p>
            <p>
              <b>Đến ngày </b> :<span>{Utils.formatDate(order?.ngay_tra)}</span>
            </p>
          </div>
          <div className="invoice-logo-brand">
            <img src={logo} alt="" />
          </div>
          <div className="invoice-head">
            <div className="head client-info">
              <p>Công ty TNHH MTV Bikelodic</p>
              <p>SDT: 0222022020</p>
              <p>Địa chỉ: 123, đường Phan Văn Việt, Quận 7, TP.HCM</p>
            </div>
            <div className="head client-data">
              <p>-</p>
              <p>Mã khách hàng: {order?.google_id}</p>
              <p>Tên người nhận: {order?.ten_nguoi_nhan}</p>
              <p>Địa chỉ giao hàng: {order?.dia_chi_nhan || "Cửa hàng"}</p>
            </div>
          </div>
          <div className="invoice-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Mô tả</th>
                  <th>Giá trị</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Template Invoice</td>
                  <td>Rp.75.000</td>
                </tr>
                <tr>
                  <td>tax</td>
                  <td>Rp.5.000</td>
                </tr>
              </tbody>
            </table>
            <div className="flex-table">
              <div className="flex-column">
                <FinesCatalog order={order} checkFines={getFines} />
              </div>
              <div className="flex-column">
                <table className="table-subtotal">
                  <tbody>
                    <tr>
                      <td>Tổng giá trị xe</td>
                      <td>{Utils.convertToVND(order?.tong_tien)}</td>
                    </tr>
                    <tr>
                      <td>Phí giao xe</td>
                      <td>{Utils.convertToVND(order?.phi_giao_xe)}</td>
                    </tr>
                    <tr>
                      <td>Tổng phí thuê xe</td>
                      <td>{Utils.convertToVND(order?.tong_thue)}</td>
                    </tr>
                    <tr>
                      <td>Phí thế chân</td>
                      <td>{Utils.convertToVND(order?.tong_the_chan)}</td>
                    </tr>
                    <tr style={{ fontWeight: "bold" }}>
                      <td>Còn nợ</td>
                      <td>
                        {order?.da_giao_tien
                          ? "0đ"
                          : Utils.convertToVND(order?.tong_thue)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="invoice-total-amount">
              <p>Thu thêm: {Utils.convertToVND(fineTotal)}</p>
              <button
                onClick={rentalCompletionHandle}
                className="add-invoice-btn"
              >
                Hoàn thành
              </button>
            </div>
          </div>
          <div className="invoice-footer">
            <p>Thankyou, happy shopping again</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default RentalCompletion;
