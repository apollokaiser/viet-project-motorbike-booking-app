import { useEffect, useState } from "react";
import DataTable from "@/features/admin/order/components/DataTable";
import OrderService from "@/services/OrderSerivce";

function ExpiredOrders() {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    OrderService.getExpiredOrders().then((result) => {
      if (result) setDatas(result.data);
    });
  });
  return (
    <>
      <DataTable title={"Đơn quá hạn"} data={datas} />
    </>
  );
}

export default ExpiredOrders;
