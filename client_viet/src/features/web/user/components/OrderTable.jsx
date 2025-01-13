import { useSearchParams } from "react-router-dom";
import OrderTableItem from "./OrderTableItem";
import { useEffect, useMemo, useState } from "react";
import OrderService from "@/services/OrderSerivce";

function OrderTable({ status }) {
  const [params, setParams] = useSearchParams();
  const [orders, setOrders] = useState();
  const sort = params.get("sort");
  const id = params.get("id");
  useEffect(() => {
    OrderService.getOrderByCustomerID(id).then((result) => {
      if (result) setOrders(result);
    });
  }, [id]);
  const sortData = useMemo(() => {
    if (sort == "all" || sort == "" || !sort) {
      return orders;
    }
    const sortOrders = orders?.filter((order) => order.ma_tinh_trang == sort);
    return sortOrders;
  }, [orders, sort]);
  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th>Mã đơn thuê #</th>
              <th>Ngày thuê xe</th>
              <th>Trang thái</th>
              <th>Tổng</th>
            </tr>
          </thead>
          <tbody>
            {sortData?.length &&
              sortData.map((order) => (
                <OrderTableItem
                  key={order.ma_don_dat}
                  order={order}
                  status={status}
                />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OrderTable;
