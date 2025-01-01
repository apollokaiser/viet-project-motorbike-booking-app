import { useSearchParams } from "react-router-dom";
import "./license-plate.css";
import { useEffect, useState } from "react";
import ProductService from "@/services/ProductService";
import LicensePlateActions from "./LicensePlateActions";
import Alert from "@utils/Alert";

function LicensePlate() {
  const [params, setParams] = useSearchParams();
  const [plateList, setPlateList] = useState();
  const [addLicensePlate, setAddLicensePlate] = useState();
  const vehicleId = params.get("v_id");
  useEffect(() => {
    ProductService.getLicensePlates(vehicleId).then((result) => {
      if (result) {
        console.log(result);
        setPlateList(result);
      }
    });
  }, [vehicleId]);
  const handClose = () => {
    setParams((pre) => {
      return new URLSearchParams(
        pre.toString().replace(`v_id=${vehicleId}`, ``)
      );
    });
  };
  const handleDelete = (id, mode) => {
    if (plateList.length > 0 && mode == 0) {
      setPlateList(plateList.filter((bike) => bike.bien_so !== id));
    } else if (plateList.length > 0 && mode == 1) {
      setPlateList((prev) =>
        prev.map((plate) => {
          if (plate.bien_so === id) {
            return { ...plate, tinh_trang: false };
          }
          return plate;
        })
      );
    }
  };
  const handleActive = (id) => {
    if (plateList.length > 0) {
      setPlateList((prev) =>
        prev.map((plate) => {
          if (plate.bien_so === id) {
            return { ...plate, tinh_trang: true };
          }
          return plate;
        })
      );
    }
  };
  const handleAddLicensePlate = async () => {
    if(!addLicensePlate || addLicensePlate =="" ) {
      Alert.showToast("Vui lòng nhập biển số xe", "error");
      return;
    }
    const bienSo = {
      bien_so: addLicensePlate?.toUpperCase(),
      dang_thue: false,
      tinh_trang: true,
      ma_xe: vehicleId,
    }
    const result = await ProductService.addBienSoXe(bienSo);
    if (result) {
      Alert.showToast("Thêm thành công !", "success");
      setPlateList((pre) =>{
        return [...pre, bienSo];
      })
    } else Alert.showToast("Thêm thất bại", "error");
  };
  return (
    <>
      <div className="lp-card">
        <div className="d-flex justify-content-between align-items-baseline">
          <span className="lp-title">{vehicleId}</span>
          <span onClick={handClose} className="p-3 cur-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 26 26"
            >
              <path d="M 21.734375 19.640625 L 19.636719 21.734375 C 19.253906 22.121094 18.628906 22.121094 18.242188 21.734375 L 13 16.496094 L 7.761719 21.734375 C 7.375 22.121094 6.746094 22.121094 6.363281 21.734375 L 4.265625 19.640625 C 3.878906 19.253906 3.878906 18.628906 4.265625 18.242188 L 9.503906 13 L 4.265625 7.761719 C 3.882813 7.371094 3.882813 6.742188 4.265625 6.363281 L 6.363281 4.265625 C 6.746094 3.878906 7.375 3.878906 7.761719 4.265625 L 13 9.507813 L 18.242188 4.265625 C 18.628906 3.878906 19.257813 3.878906 19.636719 4.265625 L 21.734375 6.359375 C 22.121094 6.746094 22.121094 7.375 21.738281 7.761719 L 16.496094 13 L 21.734375 18.242188 C 22.121094 18.628906 22.121094 19.253906 21.734375 19.640625 Z" />
            </svg>
          </span>
        </div>
        <div className="lp-comments">
          <div className="table-container">
            {plateList?.length > 0 && (
              <table className="table" id="data-table">
                <LicensePLateHeader />
                <tbody id="table-body">
                  {plateList.length > 0 &&
                    plateList.map((plate) => (
                      <tr
                        style={{
                          background: plate.tinh_trang == 1 ? null : "#a5a5a5",
                        }}
                        key={plate.bien_so}
                      >
                        <td>{plate.bien_so}</td>
                        <td>{plate.dang_thue ? "Đang thuê" : "Sẵn có"}</td>
                        <td className="actions">
                          <LicensePlateActions
                            plate={plate}
                            handleActive={handleActive}
                            handleDelete={handleDelete}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="lp-text-box">
          <div className="lp-box-container">
            <textarea
              value={addLicensePlate}
              onChange={(e) => setAddLicensePlate(e.target.value)}
              placeholder="Biển số xe ..."
            />
            <div>
              <div className="lp-formatting">
                <button
                  onClick={handleAddLicensePlate}
                  type="submit"
                  className="lp-send"
                  title="Send"
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    height="18"
                    width="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth={2.5}
                      stroke="#ffffff"
                      d="M12 5L12 20"
                    />
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth={2.5}
                      stroke="#ffffff"
                      d="M7 9L11.2929 4.70711C11.6262 4.37377 11.7929 4.20711 12 4.20711C12.2071 4.20711 12.3738 4.37377 12.7071 4.70711L17 9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function LicensePLateHeader() {
  return (
    <>
      <thead>
        <tr>
          <th className="sortable">
            <div className="sortable-wrapper">
              <span className="sortable-heading">Biển số</span>
            </div>
          </th>
          <th className="sortable">
            <div className="sortable-wrapper">
              <span className="sortable-heading">Tình trạng</span>
            </div>
          </th>
          <th className="sortable">
            <div className="sortable-wrapper">
              <span className="sortable-heading"></span>
            </div>
          </th>
        </tr>
      </thead>
    </>
  );
}

export default LicensePlate;
