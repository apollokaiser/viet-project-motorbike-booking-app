import ProductService from "@/services/ProductService";
import { toast } from "@utils/Alert";
import Swal from "sweetalert2";

function ProductActions({ bike, handleDelete, handleActive }) {
  const deleteProduct = (mode) => {
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
        const response = await ProductService.deleteBike(bike?.ma_xe, mode);
        if (response) {
          toast.fire({
            type: "success",
            title: "Thành công",
            text: mode
              ? "Đã ngừng cho thuê xe thành công."
              : "Đã xóa xe thành công.",
          });
          handleDelete(bike?.ma_xe, mode);
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
  const activeProduct = async () => {
    if (bike) {
      const result = await ProductService.activeProduct(bike.ma_xe);
      if (result) {
        toast.fire({
          type: "success",
          title: "Thành công",
          text: "Đã kích hoạt xe thành công.",
        });
        handleActive(bike.ma_xe);
        return;
      }
      toast.fire({
        type: "error",
        title: "Lỗi",
        text: "Kích hoạt xe thất bại.",
      });
    }
  };
  return (
    <>
      <div className="dropdown">
        <button className="dropdownButton">
          <i className="fa fa-ellipsis-v dropIcon" />
        </button>
        <div className="dropdown-content">
          <a
            href={`/chi-tiet-xe/${bike?.ma_xe}`}
            target="_blank"
            className="viewProduct"
          >
            <span>Xem xe</span>
            <i className="fa fa-eye" />
          </a>
          {bike?.tinh_trang_xe == 1 ? (
            <a onClick={() => deleteProduct(1)} className="deleteProduct">
              <span>Ngừng cho thuê</span>
              <i className="bx bx-block" />
            </a>
          ) : (
            <a onClick={activeProduct} className="deleteProduct">
              <span>Kích hoạt</span>
              <i className="fa fa-check" />
            </a>
          )}

          <a className="editProduct">
            <span>Sửa</span>
            <i className="fa fa-edit" />
          </a>
          <a onClick={() => deleteProduct(0)} className="deleteProduct">
            <span>Xóa</span>
            <i className="fa fa-trash" />
          </a>
        </div>
      </div>
    </>
  );
}

export default ProductActions;
