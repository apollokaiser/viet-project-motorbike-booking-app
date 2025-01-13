import OrderService from "@/services/OrderSerivce";
import Sort from "@comps/sort/Sort";
import { useEffect, useMemo, useState } from "react";
import OrderTable from "./OrderTable";

function OrderHistoryContent() {
   const [orderStatus, setOrderStatus] = useState();
    useEffect(() => {
      OrderService.getOrderStatusByCustomer().then((result) => {
        if (result) setOrderStatus(result);
      });
    }, []);
    const statusList = useMemo(() => {
      if(!orderStatus) return null;
      return orderStatus.map((item) => ({
        value: item.ma_tinh_trang,
        name: item.ten_tinh_trang,
      }));
    }, [JSON.stringify(orderStatus)]);
  return (
    <>
      <div className="d-flex justify-content-end pb-3">
        <Sort items={statusList} />
      </div>
      <OrderTable status={statusList}/>
    </>
  );
}

export default OrderHistoryContent;
