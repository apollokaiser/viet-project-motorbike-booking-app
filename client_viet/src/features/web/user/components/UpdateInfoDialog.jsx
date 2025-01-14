import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import InputFileUpload from "./InputFileUpload";
import { login } from "@/features/web/auth/redux/authSlice";
import Alert from "@/utils/Alert";
import UserService from "@/services/UserService";
import VerifyCardService from "@/services/VerifyCardService";
function UpdateInfoDialog({ openModal, toggleOpen }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [userInfo, setUserInfo] = useState(null);
  const [userCard, setUserCard] = useState(null);
  const [phone, setPhone] = useState("");
  const [updateResult, setUpdateResult] = useState(null);
  const uploadCMND = (file, remove = false) => {
    if (remove) {
      setUserCard({ ...userCard, CMND: null });
      return;
    }
    setUserCard({ ...userCard, CMND: file });
  };
  const uploadGPLX = (file, remove = false) => {
    if (remove) {
      setUserCard({ ...userCard, GPLX: null });
      return;
    }
    setUserCard({ ...userCard, GPLX: file });
  };
  const addPhone = (e) => {
    setPhone(e.target.value);
  };
  // check card function
  const validateInfoCard = (cmnd, gplx) => {
    if (!cmnd || !gplx) {
      Alert.showToast(
        "Vui lòng nhập đầy đủ",
        "info",
        1500,
        document.querySelector(".MuiDialog-root")
      );
      return false;
    }
    if (cmnd.name != gplx.name) {
      Alert.showToast(
        "Giấy phép của bạn không trùng khớp. Thử lại!",
        "info",
        1500,
        document.querySelector(".MuiDialog-root")
      );
      return false;
    }
    return true;
  };
  const handleCheck = async () => {
    // nếu không có gì xảy ra
    if (!userCard && phone == "") {
      Alert.showToast(
        "Vui lòng nhập ít nhất là số điện thoại",
        "info",
        1500,
        document.querySelector(".MuiDialog-root")
      );
      return;
    }
    // Nếu chưa có CMND/GPLX hoặc đã kiểm nhưng bị lỗi thì kiểm lại
    if (userCard && (!userInfo?.GPLX || !userInfo?.CMND)) {
      // Kiểm tra CMND và GPLT
      await checkPersonalID();
      await checkDrivingLicense();
      return;
    }
    // xét trường hợp mà user đang thiếu giấy tờ (nếu có nhập card thì phải nhập cả 2)
    if (!user.CMND || !user.GPLX) {
      if (userInfo) {
        return validateInfoCard(userInfo.CMND, userInfo.GPLX);
      }
      return true;
    } else {
      // User đã có giấy tờ từ trước và muốn cập nhật lại gì đó
      if (userInfo) {
        // có 1 cái gì đó đang muốn thay đổi
        // trường hợp là update lại cả 2 card
        if (userInfo.CMND && userInfo.GPLX) {
          // nếu giấy CMND không trùng với GPLX thì lỗi
          return validateInfoCard(userInfo.CMND, userInfo.GPLX);
        } else {
          // trường hợp 1 trong 2 cập nhật => so sánh với user.name coi trùng không
          // nếu không trùng thì => cook
          if (
            user.name == userInfo.CMND?.name ||
            user.name == userInfo.GPLX?.name
          ) {
            return true;
          } else {
            Alert.showToast(
              "Thông tin giấy phép không trùng khớp. Thử lại!",
              "info",
              1500,
              document.querySelector(".MuiDialog-root")
            );
            return false;
          }
        }
      }
    }
    // chỉ có mỗi phone thôi => return true;
    return true;
  };
  const handleUpdate = async () => {
    const check = await handleCheck();
    if (!check) return;
    // nếu không còn lỗi thì update
    const result = await UserService.updateUserInfo(userInfo, phone);
    if (result) {
      // đáng ra phải viết 1 reducer để update user info nhưng mà lười quá dùng login luôn
      dispatch(login(result.user));
      setUpdateResult(true);
      setTimeout(() => window.location.reload(), 1500);
    } else {
      setUpdateResult(false);
    }
  };
  const checkPersonalID = async () => {
    // idr = id recognition
    if (!userCard || !userCard.CMND) return;
    const idr = await VerifyCardService.getCMNDData(userCard?.CMND);
    console.log(idr);
    if (idr == null || idr == -1) {
      Alert.showToast(
        "Không thể đọc CCCD",
        "error",
        1500,
        document.querySelector(".MuiDialog-root")
      );
    } else {
      const CMND = {
        id: idr.id,
        name: idr.name,
      };
      setUserInfo((prev) => ({ ...prev, CMND: CMND }));
    }
  };
  const checkDrivingLicense = async () => {
    if (!userCard || !userCard.GPLX) return;
    // dlr = driving license recognition
    const dlr = await VerifyCardService.getGPLXData(userCard?.GPLX);
    console.log(dlr);
    if (dlr == null || dlr == -1) {
      Alert.showToast(
        "Không thể đọc GPLX",
        "error",
        1500,
        document.querySelector(".MuiDialog-root")
      );
    } else {
      const GPLX = {
        id: dlr.id,
        name: dlr.name,
        class: dlr.class,
      };
      setUserInfo((prev) => ({ ...prev, GPLX: GPLX }));
    }
  };
  return (
    <>
      <Fragment>
        <Dialog open={openModal} onClose={toggleOpen}>
          <DialogTitle>Cập nhật thông tin</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <strong>Lưu ý: </strong>
              Hãy chắc chắn rằng những gì bạn cung cấp là hoàn toàn chính xác.
              Thông tin của bạn là bảo mật và chúng tôi không dùng chúng cho bất
              kỳ hoạt động trái phép nào.
            </DialogContentText>
            <div className="alert-result">
              {updateResult == false ? (
                <div style={{ color: "red" }}>{"Lỗi không thể cập nhật"}</div>
              ) : updateResult == true ? (
                <div style={{ color: "green" }}>{"Cập nhật thành công !"}</div>
              ) : null}
            </div>
            <div className="upload-file-recognition">
              {user && (
                <InputFileUpload checkIcon={true} handleUpload={uploadCMND}>
                  CMND mặt trước
                </InputFileUpload>
              )}
              {user && (
                <InputFileUpload checkIcon={true} handleUpload={uploadGPLX}>
                  GPLT mặt trước
                </InputFileUpload>
              )}
            </div>
            <TextField
              autoFocus
              value={phone}
              onChange={addPhone}
              margin="dense"
              id="phone"
              name="phone"
              label="Số điện thoại"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleOpen}>Hủy</Button>
            <Button onClick={handleUpdate} type="submit">
              {userCard && (!userInfo?.CMND || !userInfo?.GPLX) ? "Kiểm tra" : "Cập nhật"}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    </>
  );
}

export default UpdateInfoDialog;
