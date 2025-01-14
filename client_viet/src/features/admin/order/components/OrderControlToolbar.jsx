import OrderService from "@/services/OrderSerivce";
import { useEffect, useState } from "react";
import OrderControlCheckBox from "./OrderControlCheckBox";
import { useSearchParams } from "react-router-dom";
import DateTime from "@comps/DateTimePicker/DateTime";
import Sort from "@comps/sort/Sort";

function OrderControlToolbar() {
  const [orderStatus, setOrderStatus] = useState();
  const [params, setParams] = useSearchParams();
  useEffect(() => {
    OrderService.getOrderStatus().then((result) => {
      if (result) setOrderStatus(result);
    });
  }, []);
  useEffect(()=>{
    const option = params.get('option');
    const dateFrom = params.get('date-from');
    const dateTo = params.get('date-to');
    if(!option && dateFrom && dateTo){
      setParams(pre =>{
        const newParams = new URLSearchParams(pre);
        newParams.delete('date-from');
        newParams.delete('date-to');
        return newParams;
      })
    }
  },[params])
  const orderFilter = [
    { order: "DESC", name: "Mới nhất" },
    { order: "ASC", name: "Cũ nhất" },
  ];
  const orderByFilter = [
    { orderby: "ma_don_dat", name: "Mã đơn hàng" },
    { orderby: "ngay_dat", name: "Ngày đặt" },
    { orderby: "tong_thue", name: "Tổng tiền" },
    { orderby: "ten_nguoi_nhan", name: "Tên người nhận" },
  ];
  const dateFilter = [{ option: "true", optionName: "Tùy chỉnh" }];
  const expiredFilter = [{ expired: "true", name: "Đã quá hạn" }];
  const filterHandle = (content, value) => {
    if (!content || !content.length) {
      setParams((pre) => {
        const newParams = new URLSearchParams(pre);
        newParams.delete(value);
        return newParams;
      });
      return;
    }
    setParams((pre) => {
      const newParams = new URLSearchParams(pre);
      newParams.set(value, content);
      return newParams;
    });
  };
  const filterDateHandle = (value, name) => {
    setParams((pre) => {
      const newParams = new URLSearchParams(pre);
      newParams.set(name, value);
      return newParams;
    });
  };
  return (
    <>
      <div className="order-toolbar-control pt-2">
        <div className="control-title">Cài đặt chung</div>
        <div className="control-columns">
          <div className="control-column">
            <div className="column-title mb-3">Tình trạng thuê</div>
            {orderStatus && (
              <OrderControlCheckBox
                items={orderStatus}
                value={"ma_tinh_trang"}
                name={"ten_tinh_trang"}
                handleChoose={filterHandle}
              />
            )}
          </div>
          <div className="control-column">
            <div className="column-title mb-3">Xem theo</div>
            <OrderControlCheckBox
              items={orderFilter}
              value={"order"}
              name={"name"}
              handleChoose={filterHandle}
              getall={false}
              defaultCheck={"DESC"}
              radio={true}
            />
            <div className="column-title mb-3">Sắp xếp theo</div>
            <Sort
              displayName={"name"}
              valueName={"orderby"}
              items={orderByFilter}
            />
          </div>
          <div className="control-column">
            <div className="column-title mb-3">Xếp theo ngày</div>
            <OrderControlCheckBox
              items={dateFilter}
              value={"option"}
              name={"optionName"}
              handleChoose={filterHandle}
            />{" "}
            {params.get("option") === "true" && (
              <div className="column-date-picker mb-3">
                <DateTime
                  label={"Từ ngày"}
                  name={"date-from"}
                  updateDate={filterDateHandle}
                />
                <hr />
                <DateTime
                  label={"Đến ngày"}
                  name={"date-to"}
                  updateDate={filterDateHandle}
                />
              </div>
            )}
            <div className="column-title mb-3">Tìm kiếm khác</div>
            <OrderControlCheckBox
              items={expiredFilter}
              value={"expired"}
              name={"name"}
              handleChoose={filterHandle}
              getall={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderControlToolbar;
