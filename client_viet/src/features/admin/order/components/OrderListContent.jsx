import OrderService from "@/services/OrderSerivce";
import DataTable from "@/features/admin/order/components/DataTable";
import Utils from "@utils/Utils";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

function OrderListContent() {
  const [orders, setOrders] = useState();
  const [params, setParams] = useSearchParams();
  const status = params.get("ma_tinh_trang"); //trạng thái đơn thuê
  const expired = params.get("expired"); // lấy các đơn thuê đã quá hạn
  const search = params.get("search"); // lấy theo từ khóa tìm kiếm
  const order = params.get("order"); // sắp xếp theo thứ tự nào (ASC or DESC)
  const page = params.get("page"); // phân trang
  const size = params.get("size"); // phân trang
  const dateFrom = params.get("date-from"); // lấy theo ngày bắt đầu (nếu có)
  const dateTo = params.get("date-to"); // lấy theo ngày đến (nếu có)

  const orderby = params.get("orderby");
  const sort = params.get("sort"); // lấy đơn thuê nhưng được sắp xếp theo thuộc tính (field) nào (dùng với orderby)
  useEffect(() => {
    OrderService.getOrders(
      status,
      expired,
      dateFrom,
      dateTo,
      search,
      order,
      page,
      size
    ).then((result) => {
      if (result) setOrders(result);
    });
  }, [status, expired, search, order, page, size]);
  const sortedOrders = useMemo(() => {
    if (!orders) return null;
    if (!orderby || !sort) return orders;
    return Utils.sortObjects(orders, orderby || "ma_don_dat", search, sort);
  }, [JSON.stringify(orders), sort, orderby]);
  return (
    <>
      <DataTable title={"Tổng hợp thuê xe"} datas={sortedOrders} />
    </>
  );
}

export default OrderListContent;
