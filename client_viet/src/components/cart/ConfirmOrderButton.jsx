import { useSelector } from "react-redux";
import Alert from "@/utils/Alert";
import PaymentService from "@/services/PaymentService";
function ConfirmOrderButton({ paymentInfo, paymentMethod }) {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const getAddress = () => {
    if (paymentMethod == "OFFLINE") return null;
    return `${paymentInfo.street}, 
            ${paymentInfo.ward || ""}, 
            ${paymentInfo.district},
            ${paymentInfo.province.province_name}`;
  };
  const checkValidInputData = () => {
    if (paymentMethod == "") {
      Alert.showToast("Vui lòng chọn phương thức thanh toán", "error");
      return;
    }
    if (paymentMethod != "OFFLINE") {
      if (
        paymentInfo.street == "" ||
        !paymentInfo.district ||
        !paymentInfo.ward
      ) {
        Alert.showToast("Vui lòng nhập đầy đủ thông tin địa chỉ", "info");
        return;
      }
    }
    if (paymentInfo.phone == "") {
      Alert.showToast("Vui lòng nhập đầy đủ thông tin", "info");
      return;
    }
    return true;
  };
  const handlePayment = () => {
    let valid = checkValidInputData();
    if (!valid) return;
    if (!user) {
      Alert.showAlertDialog(
        "Đăng nhập để đặt hàng",
        "Vui lòng đăng nhập để có thể sử dụng dịch vụ thuê xe của chúng tôi",
        "info"
      );
      return;
    }
    if (!user.GPLX || !user.CMND) {
      Alert.showAlertDialog(
        "Vui lòng cập nhật thông tin cá nhân",
        "Vui lòng truy cập vào trang cá nhân và cập nhật thông tin cần thiết",
        "warning"
      );
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
    if (paymentMethod == "ONLINE") {
      PaymentService.thanhToanOnline(
        paymentData,
        paymentMethod,
        orderDetails
      ).then((result) => {
        if (result.status == 200) window.location.href = result.data;
        else if (result.status == 201) {
          Alert.showAlertDialog(
            "Không thể thực hiện",
            "Bạn đã vượt quá giới hạn thuê xe trong 1 ngày",
            "warning"
          );
        } else
          Alert.showAlertDialog("Lỗi thanh toán", "Vui lòng thử lại", "error");
      });
    } else
      PaymentService.thanhToan(paymentData, paymentMethod, orderDetails).then(
        (result) => {
          if (result.status == 200) {
            Alert.showAlertDialog(
              "Đã thanh toán",
              "Thông tin đơn hàng đã được gửi đến bạn",
              "success",
              (confirmed) => (window.location.href = "/")
            );
          } else if (result.status == 201) {
            Alert.showAlertDialog(
              "Không thể thực hiện",
              "Bạn đã vượt quá giới hạn thuê xe trong 1 ngày",
              "warning"
            );
          } else {
            Alert.showAlertDialog(
              "Lỗi thanh toán",
              "Vui lòng thử lại",
              "error"
            );
          }
        }
      );
  };
  return (
    <>
      <button className="fancy" href="#">
        <span className="top-key" />
        <span className="text" onClick={handlePayment}>
          Thanh toán
        </span>
        <span className="bottom-key-1" />
        <span className="bottom-key-2" />
      </button>
    </>
  );
}

export default ConfirmOrderButton;
