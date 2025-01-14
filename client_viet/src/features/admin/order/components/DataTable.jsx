import { useEffect, useMemo, useState } from "react";

import OrderDetailDialog from "@/features/admin/order/OrderDetailDialog";
import { OrderStatus } from "@/features/admin/order/context/Context";
import Utils from "@utils/Utils";
import Swal from "sweetalert2";
import OrderService from "@/services/OrderSerivce";
import Search from "../../home/components/Search";
import { useSearchParams } from "react-router-dom";

function DataTable({ title, datas }) {
  const [status, setStatus] = useState();
  const [params, setParams] = useSearchParams();
  const search = params.get("search");
  useEffect(() => {
    OrderService.getOrderStatus().then((result) => {
      if (result) setStatus(result);
    });
  }, []);
  const orderDatas = useMemo(() => {
    if (!search || search.trim() == "") return datas;
    return datas?.filter((item) => {
      const plainText =
        item.ma_don_dat +
        item.tinhTrang.ma_tinh_trang +
        item.tinhTrang.ten_tinh_trang +
        Utils.formatDate(item.ngay_dat) +
        Utils.formatDate(item.ngay_bat_dau_thue) +
        Utils.formatDate(item.ngay_tra) +
        item.tong_thue;
      return plainText.toLowerCase().trim().includes(search.toLowerCase());
    });
  }, [search, JSON.stringify(datas)]);
  const getStatusName = (status_id) => {
    const thisStatus = status?.find((item) => item.ma_tinh_trang == status_id);
    return thisStatus?.ten_tinh_trang;
  };
  const getStatusOption = (status_id) => {
    // only use in `changeStatus()`
    if (status) {
      return status.reduce((result, { ma_tinh_trang, ten_tinh_trang }) => {
        if (ma_tinh_trang > status_id) result[ma_tinh_trang] = ten_tinh_trang;
        return result;
      }, {});
    }
    return [];
  };
  const changeStatus = async (id, status_id) => {
    //inputoptions must be a object with the following properties: {value_name:label_value}
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
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  };
  return (
    <>
      <OrderStatus.Provider value={{ status, getStatusName }}>
        <div className="data-table-container">
          <div className="title">
            <h2>{title}</h2>
            <Search />
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
              {orderDatas &&
                orderDatas.map((data) => (
                  <tr key={data.ma_don_dat}>
                    <td>{data && data.ma_don_dat}</td>
                    <td>{data && data.ten_nguoi_nhan}</td>
                    <td>{data && Utils.formatDate(data.ngay_dat)}</td>
                    <td>
                      {data && Utils.formatDate(data.ngay_bat_dau_thue)} -{" "}
                      {data && Utils.formatDate(data.ngay_tra)}
                    </td>
                    <td
                      className="cur-pointer"
                      onClick={() =>
                        changeStatus(
                          data.ma_don_dat,
                          data.tinhTrang.ma_tinh_trang
                        )
                      }
                    >
                      {data && data.tinhTrang.ten_tinh_trang}
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
