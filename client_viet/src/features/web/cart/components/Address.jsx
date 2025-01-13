import { useState } from "react";
import LocateService, { city } from "@/services/LocateService";
function Address({ handleDistrict, handleWard, paymentMethod }) {
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);

  const changeProvince = () => {
    LocateService.getDistrict(city.province_id).then((result) => {
      setDistrict(result);
    });
  };
  const changeDistrict = (e) => {
    LocateService.getWard(e.target.value).then((result) => {
      setWard(result);
    });
    handleDistrict(e);
  };
  return (
    <>
      <div
        className={
          paymentMethod == "OFFLINE"
            ? "select-address flex hide"
            : "select-address flex"
        }
      >
        <label htmlFor="">
          <select name="province" id="province" onChange={changeProvince}>
            <option value="">Chọn tỉnh, thành phố</option>
            <option value={city.province_id}>{city.province_name}</option>
          </select>
        </label>
        <label htmlFor="">
          <select name="district" id="district" onChange={changeDistrict}>
            <option value="">Chọn quận, huyện</option>
            {district &&
              district.map((district) => (
                <option key={district.district_id} value={district.district_id}>
                  {district.district_name}
                </option>
              ))}
          </select>
        </label>
        <label htmlFor="">
          <select name="ward" id="ward" onChange={handleWard}>
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
    </>
  );
}

export default Address;
