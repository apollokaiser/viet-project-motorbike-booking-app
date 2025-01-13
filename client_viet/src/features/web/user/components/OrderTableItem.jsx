import Link from "@comps/Link";
import Utils from "@utils/Utils";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const OrderTableItem = ({ order, status }) => {
  const user = useSelector((state) => state.auth.user);
  console.log(order);
  const getOrderStatus = useMemo(() => {
    const thisStatus = status?.find(
      (status) => status.value == order.ma_tinh_trang
    )?.name;
    let className = "";
    switch (order?.ma_tinh_trang) {
      case 1:
        className = "badge-warning";
        break;
      case 2:
        className = "badge-info";
        break;
      case 3:
        className = "badge-info";
        break;
      case 4:
        className = "badge-danger";
        break;
      case 5:
        className = "badge-success";
        break;
      default:
        return "badge-success";
    }
    return { thisStatus, className };
  }, [JSON.stringify(order), JSON.stringify(status)]);
  return (
    <>
      <tr>
        <td>
          <Link
            className="navi-link"
            to={"/khach-hang/lich-su-thue-xe/chi-tiet"}
            params={{ id: user.google_id, order_id: order?.ma_don_dat }}
          >
            {order?.ma_don_dat}
          </Link>
        </td>
        <td>{Utils.formatDate(order?.ngay_dat)}</td>
        <td>
          <span className={`badge m-0 ${getOrderStatus.className}`}>
            {getOrderStatus.thisStatus}
          </span>
        </td>
        <td>
          <span>{Utils.convertToVND(order?.tong_thue)}</span>
        </td>
      </tr>
    </>
  );
};
export default OrderTableItem;
