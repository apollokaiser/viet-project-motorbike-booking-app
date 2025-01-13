import ProductService from "@/services/ProductService";
import { toast } from "@utils/Alert";
import Swal from "sweetalert2";

function LicensePlateActions({plate, handleDelete, handleActive}) {
    const deleteLicensePlate = (mode) => {
      /**
       * mode = 0: xóa vĩnh viễn, = 1 ngừng cho thuê (status = 1 --> 0)
       *  */
      (async () => {
        const result = await Swal.fire({
          title: "Xóa dữ liệu",
          text: mode
            ? "Bạn có chắc chắn muốn ngừng cho thuê xe này?"
            : "Bạn có chắc chắn muốn xóa xe này?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
        });
        if (result.isConfirmed) {
          const response = await ProductService.deleteBienSoXe(plate?.bien_so,plate.ma_xe, mode);
          if (response) {
            toast.fire({
              type: "success",
              title: "Thành công",
              text: mode
                ? "Đã ngừng cho thuê xe thành công."
                : "Đã xóa xe thành công.",
            });
            handleDelete(plate?.bien_so, mode);
          } else {
            toast.fire({
              type: "error",
              title: "Lỗi",
              text: "Xóa dữ liệu thất bại.",
            });
          }
        }
      })();
    };
    const activeLicensePlate = async () => {
      if (plate) {
        const result = await ProductService.activeBienSoXe(plate.bien_so,plate.ma_xe);
        if (result) {
          toast.fire({
            type: "success",
            title: "Thành công",
            text: "Đã kích hoạt xe thành công.",
          });
          handleActive(plate.bien_so);
          return;
        }
        toast.fire({
          type: "error",
          title: "Lỗi",
          text: "Kích hoạt xe thất bại.",
        });
      }
    };
    return (<>
            <div className="dropdown">
          <button className="dropdownButton">
            <i className="fa fa-ellipsis-v dropIcon" />
          </button>
          <div className="dropdown-content">
            {plate?.tinh_trang == 1 ? (
              <a onClick={() => deleteLicensePlate(1)} className="deleteProduct">
                <span>Ngừng cho thuê</span>
                <i className="bx bx-block" />
              </a>
            ) : (
              <a onClick={activeLicensePlate} className="deleteProduct">
                <span>Kích hoạt</span>
                <i className="fa fa-check" />
              </a>
            )}
  
            <a onClick={() => deleteLicensePlate(0)} className="deleteProduct">
              <span>Xóa</span>
              <i className="fa fa-trash" />
            </a>
          </div>
        </div>
    </>)
  }

export default LicensePlateActions;