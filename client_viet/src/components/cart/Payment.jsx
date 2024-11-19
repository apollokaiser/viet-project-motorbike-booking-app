import { getDistrict, getWard } from "@/apis/vapis";
import PaymentMethod from "@/utils/PaymentMethod";
import { city } from "@/configs/data";
import { useEffect, useState } from "react";
import DateTime from "@comps/DateTimePicker/DateTime";
import dayjs from "dayjs";
import { getPhiVanChuyen } from "@/apis/getData";
import { useSelector, useDispatch } from "react-redux";
import { setTransportFee } from "@/redux/cart/cartSplice";
import { thanhToan, thanhToanOnline } from "@/apis/dataSender";
import Swal from "sweetalert2";
import { toast } from "@/utils/Alert";

function Payment() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [district, setDistrict] = useState([]);
  const [phiVanChuyen, setPhiVanChuyen] = useState([]);
  const [ward, setWard] = useState([]);
  const date = new Date();
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
  const chooseProvince = () => {
    getDistrict(city.province_id).then((result) => {
      setDistrict(result);
    });
  };
  const choosePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
    if (e.target.value == "OFFLINE") {
      dispatch(
        setTransportFee({
          ma_phi: null,
          phi_van_chuyen: 0,
          ma_tinh: null,
          ma_quan: null,
        })
      );
    } else {
      //check transport fee again
      checkTransportFee(paymentInfo.district?.id);
    }
  };
  const chooseDistrict = (e) => {
    getWard(e.target.value).then((result) => {
      setWard(result);
    });
    setPaymentInfo({
      ...paymentInfo,
      district: {
        district_id: e.target.value,
        district_name: e.target.options[e.target.selectedIndex].text,
      },
      ward:null
    });
    checkTransportFee(e.target.value);
  };
  const checkTransportFee = (district_id) => {
    if (!district_id || district_id == "") return;
    let phi_van_chuyen = phiVanChuyen.find((fee) => fee.ma_quan == district_id);
    if (!phi_van_chuyen) {
      phi_van_chuyen = phiVanChuyen.find((fee) => fee.ma_quan == null);
    }
    dispatch(setTransportFee(phi_van_chuyen));
  };
  const chooseWard = (e) => {
    setPaymentInfo({
      ...paymentInfo,
      ward: {
        ward_id: e.target.value,
        ward_name: e.target.options[e.target.selectedIndex].text,
      },
    });
  };
  const handleChangeInput = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };
  const chooseDate = (value, name) => {
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };
  const getAddress = () => {
    // if offline -> change address to null;
    if (paymentMethod == "OFFLINE") return null;
    return `${paymentInfo.street}, ${paymentInfo.ward?.ward_name || ""}, ${paymentInfo.district.district_name}, ${paymentInfo.province.province_name}`;
  };
  const handlePayment = () => {
    if(paymentMethod =="") {
      toast.fire({
        title: "Vui lòng chọn phương thức thanh toán",
        icon: "error",
      })
      return;
    }
    const orderDetails = {
      items: cart.items.map((item) => {
        return { ...item, gia_thue: item.detail.gia_thue, detail: null };
      }),
      total: cart.total,
      transport_fee: cart.transport_fee.phi_van_chuyen,
      tong_thue: Number(cart.transport_fee.phi_van_chuyen || 0) + cart.total,
      ma_phi: cart.transport_fee.ma_phi,
    };
    const paymentData = {
      name: paymentInfo.name,
      phone: paymentInfo.phone,
      address: getAddress(),
      startDate: paymentInfo.startDate,
      endDate: paymentInfo.endDate,
      notion: paymentInfo.notion,
    };
    if(paymentInfo.phone == "" || paymentInfo.ward ==null) {
      toast.fire({
        title: "Vui lòng nhập đầy đủ thông tin",
        icon: "error",
      })
      return;
    }
    if (paymentMethod == "ONLINE") {
      thanhToanOnline(paymentData, paymentMethod, orderDetails).then(
        (result) => {
          if (result.status == 200) window.location.href = result.data;
          else 
          Swal.fire({
            title: "Lỗi thanh toán",
            text: "Vui lòng thử lại",
            icon: "error",
            confirmButtonText: "Quay lại",
          });
        }
      );
    } else
      thanhToan(paymentData, paymentMethod, orderDetails).then((result) => {
        console.log(result.data);
        if (result.status == 200) {
          (async () => {
            const response = await Swal.fire({
              title: "Đã thanh toán",
              text: "Thông tin đơn hàng đã được gửi đến bạn",
              icon: "success",
              confirmButtonText: "Quay lại trang chủ",
            });
            if (response.isConfirmed) {
              window.location.href = "/";
            }
          })();
        } else {
          Swal.fire({
            title: "Lỗi thanh toán",
            text: "Vui lòng thử lại",
            icon: "error",
            confirmButtonText: "Quay lại",
          });
        }
      });
  };
  return (
    <>
      <div className="payment-content">
        <div className="payment-method">
          <h3>Hình thức thanh toán</h3>
          <div className="payment-form">
            {PaymentMethod.map((method, index) => (
              <div key={method.id}>
                <input
                  id={`radio ${index}`}
                  type="radio"
                  name="option"
                  value={method.id}
                  checked={paymentMethod == method.id}
                  onChange={choosePaymentMethod}
                />
                <label htmlFor={`radio ${index}`}>{method.title}</label>
              </div>
            ))}
          </div>
        </div>
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
            <div
              className={
                paymentMethod == "OFFLINE"
                  ? "select-address flex hide"
                  : "select-address flex"
              }
            >
              <label htmlFor="">
                <select name="province" id="province" onChange={chooseProvince}>
                  <option value="">Chọn tỉnh, thành phố</option>
                  <option value={city.province_id}>{city.province_name}</option>
                </select>
              </label>
              <label htmlFor="">
                <select name="district" id="district" onChange={chooseDistrict}>
                  <option value="">Chọn quận, huyện</option>
                  {district &&
                    district.map((district) => (
                      <option
                        key={district.district_id}
                        value={district.district_id}
                      >
                        {district.district_name}
                      </option>
                    ))}
                </select>
              </label>
              <label htmlFor="">
                <select name="ward" id="ward" onChange={chooseWard}>
                  <option value="">Chọn xã, phường</option>
                  {ward &&
                    ward.map((ward) => (
                      <option key={ward.ward_id} value={ward.ward_id}>
                        {ward.ward_name}
                      </option>
                    ))}
                </select>
              </label>
            </div>
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

            <button className="fancy" href="#">
              <span className="top-key" />
              <span className="text" onClick={handlePayment}>
                Thanh toán
              </span>
              <span className="bottom-key-1" />
              <span className="bottom-key-2" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
