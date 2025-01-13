import PhiPhatService from "@/services/PhiPhatService";
import SelectField from "@comps/form/SelectField";
import Utils from "@utils/Utils";
import { useEffect, useMemo, useState } from "react";
import FineList from "./FineList";
import UpdateFineDialog from "./UpdateFineDialog";
import Alert from "@utils/Alert";

function FinesCatalog({ order, checkFines }) {
  const [fineDatas, setfineDatas] = useState(); // fineDatas are fetched from the server
  const [fineList, setFineList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    PhiPhatService.getAllFines().then((result) => {
      if (result) {
        setfineDatas(result);
      }
    });
  }, []);
  const sendFines = (value, list = null) => {
    checkFines(value, list || fineList);
  };
  const handleChooseFines = (name, value) => {
    if (value != 0) {
      //trừ trường hợp trễ hạn ra (đã tự check)
      setFineList((pre) => {
        const addFine = fineDatas?.find((item) => item.ma_phi_phat == value);
        if (addFine) {
          if (!fineList.findIndex((item) => item.ma_phi_phat == value)) {
            sendFines(addFine.tien_phat);
          pre.push(addFine);
          } else {
            Alert.showToast("Lỗi đã tồn tại");
          }
        }
        return pre;
      });
    }
  };
  const handleOpenUpdate = (fine) => {
    setOpenDialog(fine);
  };
  const handleUpdateFine = (fine) => {
    setOpenDialog(false);
    setFineList((pre) => {
      const index = pre.findIndex(
        (item) => item.ma_phi_phat == fine.ma_phi_phat
      );
      if (index !== -1) {
        const phiPhat =
          Number.parseInt(fine.tien_phat) -
          Number.parseInt(pre[index].tien_phat);
        sendFines(phiPhat);
        pre[index] = fine;
      }
      return [...pre];
    });
  };
  const removeFine = (fine) => {
    setFineList((pre) => {
      const index = pre.findIndex(
        (item) => item.ma_phi_phat == fine.ma_phi_phat
      );
      if (index !== -1) {
        sendFines(-Number.parseInt(pre[index].tien_phat));
        pre.splice(index, 1);
      }
      return [...pre];
    });
  };

  const orderTime = useMemo(() => {
    const overDue = Utils.checkExpires(order?.ngay_tra);
    if (overDue != 0) {
      setFineList((pre) => {
        const addfine = fineDatas?.find((item) => item.ma_phi_phat == 0);
        if (addfine) {
          addfine.tien_phat =
            addfine.tien_phat * Math.floor(overDue.time / 24 - 1);
          pre.push(addfine);
          sendFines(addfine.tien_phat, pre);
        }
        return pre;
      });
      return overDue;
    }
    return Utils.differenceHourDate(
      order?.ngay_giao_xe,
      new Date().now() / 1000
    );
  }, [JSON.stringify(order)]);

  const changeBackgroundWithOverdue = () => {
    let backgroundColor = "";
    if (orderTime.expired) {
      const overdueTime = Math.floor(orderTime.time / 24) - 1;
      if (overdueTime >= 5) {
        backgroundColor = "red";
      } else if (overdueTime >= 3) {
        backgroundColor = "orange";
      } else {
        backgroundColor = "yellow";
      }
    }
    return { backgroundColor };
  };
  return (
    <>
      <SelectField
        items={fineDatas}
        label={"Phí phạt"}
        displayName={"ly_do_phat"}
        value={"ma_phi_phat"}
        onChange={handleChooseFines}
      />
      {orderTime && (
        <div className="order-card">
          <div className="img-section">
            <div style={changeBackgroundWithOverdue()} className="card-desc">
              <div className="card-header">
                <div className="card-title">
                  {orderTime.expired ? "Đã quá hạn" : "Thời gian thuê"}
                </div>
              </div>
              <div className="card-time">
                {(orderTime.time || orderTime) + " giờ"}
              </div>
              <p className="recent">
                Ngày giao :{" "}
                {new Date(order?.ngay_giao_xe * 1000).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
      {fineList && fineList.length > 0 && (
        <FineList
          items={fineList}
          handleOpenUpdate={handleOpenUpdate}
          handleDelete={removeFine}
        />
      )}
      {openDialog != false && (
        <UpdateFineDialog
          open={openDialog}
          fine={openDialog}
          handleOpen={setOpenDialog}
          handleChange={handleUpdateFine}
        />
      )}
    </>
  );
}

export default FinesCatalog;
