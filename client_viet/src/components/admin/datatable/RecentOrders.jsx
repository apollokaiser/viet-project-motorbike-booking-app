import { useEffect, useState } from "react";
import OrderService from "@/services/OrderSerivce";
import DataTable from "./DataTable";

function RecentOrders() {
    const [datas,setDatas] = useState([]);
    useEffect(() =>{
      OrderService.getRecentOrders().then(result => {
            setDatas(result)

        }
         )
    },[])
    return (<>
        <DataTable title={"Đơn thuê gần đây"} datas={datas}  />
    </>);
}

export default RecentOrders;