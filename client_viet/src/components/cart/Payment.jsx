import { city } from "@/configs/data";
import { useEffect, useState } from "react";
import DateTime from "@comps/DateTimePicker/DateTime";
import dayjs from "dayjs";
import { getPhiVanChuyen } from "@/apis/getData";
import { useDispatch } from "react-redux";
import { setTransportFee } from "@/redux/cart/cartSplice";
import { checkAddressDistance } from "@/apis/goongAPI";
import Address from "./Address";
import PaymentMethod from "./PaymentMethod";
import ConfirmOrderButton from "./ConfirmOrderButton";

function Payment() {
  const date = new Date();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [phiVanChuyen, setPhiVanChuyen] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({
    name: "",
    phone: "",
    province: city,
    street: "",
    notion: "",
    startDate: dayjs(date).unix(),
    endDate: dayjs(date).add(1, "day").unix(),
  });
  useEffect(() => {
    getPhiVanChuyen().then((result) => {
      setPhiVanChuyen(result.data);
    });
  }, []);
  const resetTransport = () => {
    // hàm này gọi khi và chỉ khi có sự thay đổi về địa chỉ
    dispatch(
      setTransportFee({
        ma_phi: null,
        phi_van_chuyen: 0,
      })
    );
    setPaymentMethod(""); // bỏ chọn để người dùng chọn lại -> check lại khoảng cách --> ez game
  };
  const choosePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
    if (e.target.value == "OFFLINE") {
      dispatch(
        setTransportFee({
          ma_phi: null,
          phi_van_chuyen: 0,
        })
      );
    } else {
      //check transport fee again
      checkAddressDistance(getAddress()).then((result) => {
        const fee = phiVanChuyen.find(
          (item) => item.from <= result && result <= item.to
        );
        if (fee) {
          dispatch(setTransportFee(fee));
        } else {
          dispatch(
            setTransportFee({
              ma_phi: null,
              phi_van_chuyen: 0,
            })
          );
        }
      });
    }
  };
  const getAddress = () => {
    if (paymentMethod == "OFFLINE") return null;
    return `${paymentInfo.street}, ${paymentInfo.ward || ""}, 
        ${paymentInfo.district},
        ${paymentInfo.province.province_name}`;
  };
  const chooseDistrict = (e) => {
    setPaymentInfo({
      ...paymentInfo,
      district: e.target.options[e.target.selectedIndex].text,
      ward: null,
    });
    resetTransport();
  };
  const chooseWard = (e) => {
    setPaymentInfo({
      ...paymentInfo,
      ward: e.target.options[e.target.selectedIndex].text,
    });
    resetTransport();
  };
  const handleChangeInput = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };
  const chooseDate = (value, name) => {
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };
  return (
    <>
      <div className="payment-content">
        <div className="payment-info">
          <h3>Thông tin giao hàng</h3>
          <div className="form">
            <div className="flex">
              <label>
                <input
                  placeholder=""
                  type="text"
                  className="input"
                  value={paymentInfo.name}
                  onChange={handleChangeInput}
                  name="name"
                />
                <span>Họ tên</span>
              </label>
              <label>
                <input
                  required
                  placeholder=""
                  type="text"
                  className="input"
                  value={paymentInfo.phone}
                  onChange={handleChangeInput}
                  name="phone"
                />
                <span>Số điện thoại</span>
              </label>
            </div>
            <div className="flex date-time">
              <DateTime
                name={"startDate"}
                defaultValue={paymentInfo.startDate}
                updateDate={chooseDate}
                label={"Ngày bắt đầu"}
              />
              <DateTime
                name={"endDate"}
                defaultValue={paymentInfo.endDate}
                updateDate={chooseDate}
                label={"Ngày kết thúc"}
              />
            </div>
            <Address
              handleDistrict={chooseDistrict}
              handleWard={chooseWard}
              paymentMethod={paymentMethod}
            />
            <label>
              <input
                required
                placeholder=""
                type="text"
                className={paymentMethod == "OFFLINE" ? "input hide" : "input"}
                name="street"
                value={paymentInfo.street}
                onChange={handleChangeInput}
              />
              <span>Số nhà, tên đường</span>
            </label>
            <label>
              <textarea
                required
                rows={3}
                placeholder=""
                className="input01"
                name="notion"
                value={paymentInfo.notion}
                onChange={handleChangeInput}
              />
              <span>Yêu cầu khác (không bắt buộc)</span>
            </label>
            <PaymentMethod
              changeMethod={choosePaymentMethod}
              currentMethod={paymentMethod}
            />
            <ConfirmOrderButton paymentInfo={paymentInfo} paymentMethod={paymentMethod} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
