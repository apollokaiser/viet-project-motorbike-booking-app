import OrderService from "@/services/OrderSerivce";
import Utils from "@utils/Utils";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function OrderInfomation() {
  const [orderDetail, setOrderDetail] = useState();
  const [params, setParams] = useSearchParams();
  const id = params.get("order_id");
  useEffect(() => {
    OrderService.getOrderDetailByCutomer(id).then((result) => {
      console.log(result);
      if (result) setOrderDetail(result);
    });
  }, [id]);
  console.log(orderDetail?.dia_chi_nhan.split(","));
  return (
    <>
      <div id="content">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <td colSpan="2" className="text-left">
                Chi tiết đơn thuê #
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ width: "50%" }} className="text-left">
                <b>Mã đặt xe:</b> #{orderDetail?.ma_don_dat}
                <br />
                <b>Ngày đặt:</b> {Utils.formatDate(orderDetail?.ngay_dat)}
                <br />
                <b>Tình trang:</b> {orderDetail?.tinhTrang.ten_tinh_trang}
              </td>
              <td style={{ width: "50%" }} className="text-left">
                <b>Tên người nhận:</b> {orderDetail?.ten_nguoi_nhan}
                <br />
                <b>Hình thức giao xe:</b>{" "}
                {orderDetail?.ptThanhToan.ten_thanh_toan}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <td
                style={{ width: "50%", verticalAlign: "top" }}
                className="text-left"
              >
                Địa chỉ giao xe
              </td>
              <td
                style={{ width: "50%", verticalAlign: "top" }}
                className="text-left"
              >
                Lời nhắc
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-left">
                {orderDetail?.dia_chi_nhan.split(",").map((item) => (
                  <>
                    {item}
                    <br />
                  </>
                ))}
              </td>
              <td className="text-left">{orderDetail?.yeu_cau || "Không"}</td>
            </tr>
          </tbody>
        </table>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <td className="text-left">Mã xe</td>
                <td className="text-left"></td>
                <td className="text-right">Số lượng</td>
                <td className="text-right">Giá thuê</td>
                <td className="text-right">Tiền thế chân</td>
                <td className="text-right">Tổng cộng</td>
                {/* <td style={{ width: 20 }} /> */}
              </tr>
            </thead>
            <tbody>
              {orderDetail &&
                orderDetail.detail.map((item) => (
                  <tr key={item.ma_xe}>
                    <td className="text-left">{item.ma_xe} </td>
                    <td className="text-left">{item.ten_xe}</td>
                    <td className="text-right">{item.so_luong}</td>
                    <td className="text-right">{Utils.convertToVND(item.gia_tien)}</td>
                    <td className="text-right">{Utils.convertToVND(item.the_chan)}</td>
                    <td className="text-right">
                      {Utils.convertToVND(item.so_luong * item.gia_tien)}
                    </td>
                    {/* <td style={{ whiteSpace: "nowrap" }} className="text-right"> <a className="btn btn-primary" title="" data-toggle="tooltip" href="#" data-original-title="Reorder"><i className="fa fa-shopping-cart" /></a>
                                        <a className="btn btn-danger" title="" data-toggle="tooltip" href="return.html" data-original-title="Return"><i className="fa fa-reply" /></a>
                                    </td> */}
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" />
                <td className="text-right">
                  <b>Chi phí thuê xe</b>
                </td>
                <td className="text-right">
                  {Utils.convertToVND(orderDetail?.tong_tien)}
                </td>
                <td />
              </tr>
              <tr>
                <td colSpan="3" />
                <td className="text-right">
                  <b>Tổng phí thế chân</b>
                </td>
                <td className="text-right">
                  {Utils.convertToVND(orderDetail?.tong_the_chan)}
                </td>
                <td />
              </tr>
              <tr>
                <td colSpan="3" />
                <td className="text-right">
                  <b>Phí giao xe</b>
                </td>
                <td className="text-right">
                  {Utils.convertToVND(orderDetail?.phi_giao_xe)}
                </td>
                <td />
              </tr>
              <tr>
                <td colSpan="3" />
                <td className="text-right">
                  <b>Tổng</b>
                </td>
                <td className="text-right">
                  {Utils.convertToVND(orderDetail?.tong_thue)}
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
          <em style={{color:"red", fontStyle:"italic"}}>*Tổng tiền chỉ bao gồm tổng tiền thuê xe và phí giao xe, không bao gồm tiền thế chân</em>
        </div>
        {/* <h3>Lich sử</h3>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <td className="text-left">Ngày</td>
              <td className="text-left">Trạng thái</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-left">20/06/2016</td>
              <td className="text-left">Hoàn thành</td>
            </tr>
            <tr>
              <td className="text-left">21/06/2016</td>
              <td className="text-left">Đã giao</td>
            </tr>
            <tr>
              <td className="text-left">24/06/2016</td>
              <td className="text-left">Đã xác nhận</td>
            </tr>
          </tbody>
        </table> */}
        <div className="buttons clearfix">
                        <div className="pull-right"><a className="btn btn-primary" href="#">Continue</a>
                        </div>
                    </div>
      </div>
    </>
  );
}

export default OrderInfomation;
