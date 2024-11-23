import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "@/utils/Alert";
import { thanhToan, thanhToanOnline } from "@/apis/dataSender";
function ConfirmOrderButton({ paymentInfo, paymentMethod }) {
  const cart = useSelector((state) => state.cart);

  const getAddress = () => {
    if (paymentMethod == "OFFLINE") return null;
    return `${paymentInfo.street}, 
            ${paymentInfo.ward || ""}, 
            ${paymentInfo.district},
            ${paymentInfo.province.province_name}`;
  };
  const checkValidInputData = () => {
    if (paymentMethod == "") {
      toast.fire({
        title: "Vui lòng chọn phương thức thanh toán",
        icon: "error",
      });
      return;
    }
    if (paymentMethod != "OFFLINE") {
      if (
        paymentInfo.street == "" ||
        !paymentInfo.district ||
        !paymentInfo.ward
      ) {
        toast.fire({
          title: "Vui lòng nhập đầy đủ thông tin địa chỉ",
          icon: "error",
        });
        return;
      }
    }
    if (paymentInfo.phone == "") {
      toast.fire({
        title: "Vui lòng nhập đầy đủ thông tin",
        icon: "error",
      });
      return;
    }
    return true;
  };
  const handlePayment = () => {
    let valid = checkValidInputData();
    if (!valid) return;
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
    // if (paymentMethod == "ONLINE") {
    //   thanhToanOnline(paymentData, paymentMethod, orderDetails).then(
    //     (result) => {
    //       if (result.status == 200) window.location.href = result.data;
    //       else
    //       Swal.fire({
    //         title: "Lỗi thanh toán",
    //         text: "Vui lòng thử lại",
    //         icon: "error",
    //         confirmButtonText: "Quay lại",
    //       });
    //     }
    //   );
    // } else
    //   thanhToan(paymentData, paymentMethod, orderDetails).then((result) => {
    //     console.log(result.data);
    //     if (result.status == 200) {
    //       (async () => {
    //         const response = await Swal.fire({
    //           title: "Đã thanh toán",
    //           text: "Thông tin đơn hàng đã được gửi đến bạn",
    //           icon: "success",
    //           confirmButtonText: "Quay lại trang chủ",
    //         });
    //         if (response.isConfirmed) {
    //           window.location.href = "/";
    //         }
    //       })();
    //     } else {
    //       Swal.fire({
    //         title: "Lỗi thanh toán",
    //         text: "Vui lòng thử lại",
    //         icon: "error",
    //         confirmButtonText: "Quay lại",
    //       });
    //     }
    //   });
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
