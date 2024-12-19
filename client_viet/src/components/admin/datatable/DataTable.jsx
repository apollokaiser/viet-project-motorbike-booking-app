import {useEffect, useState } from "react";
import search from "@assets/img/admin/search.png";

import OrderDetailDialog from "../dialog/OrderDetailDialog";
import { OrderStatus } from "../context/Context";
import Utils from "@utils/Utils";
import Swal from "sweetalert2";
import OrderService from "@/services/OrderSerivce";

function DataTable({ title, datas }) {
  const [status, setStatus] = useState({});
  useEffect(() => {
   OrderService.getOrderStatus().then((result) => {
      setStatus(result);
    });
  }, []);
  const formatStatus = (status_id) => {
    const thisStatus = Object.keys(status).find(
      (key) => status[key].id == status_id
    );
    return status[thisStatus].name;
  };
  const getStatusOption = (status_id) => {
    return Object.values(status).reduce((result, { id, name }) => {
      if (id > status_id) result[id] = name;
      return result;
    }, {});
  };
  const changeStatus = async (id, status_id) => {
    const { value: stt } = await Swal.fire({
      title: "Thay đổi trạng thái đơn thuê xe",
      input: "select",
      inputOptions: getStatusOption(status_id),
      inputPlaceholder: "Chọn trạng thái",
      showCancelButton: true,
    });
    if (stt) {
      const result = await OrderService.changeOrderStatus(id, stt);
      if (result) {
        Swal.fire("Thay đổi trạng thái thành công!", "", "success");
        window.location.reload();
      }
    }
  };
  return (
    <>
      <OrderStatus.Provider value={{ status, formatStatus }}>
        <div className="recent-payments">
          <div className="title">
            <h2>{title}</h2>
            <div className="search">
              <input type="text" placeholder="Search.." />
              <button type="submit">
                <img src={search} alt="" />
              </button>
            </div>
            <a href="#" className="btn">
              Tất cả
            </a>
          </div>
          <table>
            <tbody>
              <tr>
                <th>ID</th>
                <th>Tên người nhận</th>
                <th>Ngày đặt</th>
                <th>Thời hạn</th>
                <th>Tình trạng</th>
                <th>Giá tiền</th>
                <th />
              </tr>
              {datas &&
                datas.map((data) => (
                  <tr key={data.ma_don_dat}>
                    <td>{data && data.ma_don_dat}</td>
                    <td>{data && data.ten_nguoi_nhan}</td>
                    <td>{data && Utils.formatDate(data.ngay_dat)}</td>
                    <td>
                      {data && Utils.formatDate(data.ngay_bat_dau_thue)} -{" "}
                      {data && Utils.formatDate(data.ngay_tra)}
                    </td>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        changeStatus(data.ma_don_dat, data.tinh_trang_thue)
                      }
                    >
                      {data && formatStatus(data.tinh_trang_thue)}
                    </td>
                    <td>{data && Utils.convertToVND(data.tong_thue)}</td>
                    <td>
                      <OrderDetailDialog id={data?.ma_don_dat} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </OrderStatus.Provider>
    </>
  );
}

export default DataTable;
