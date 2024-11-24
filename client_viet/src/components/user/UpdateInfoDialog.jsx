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
import { getCMNDData, getGPLXData } from "@/apis/verifyCard";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "@/apis/dataSender";
import InputFileUpload from "./InputFileUpload";
import { login } from "@/redux/auth/authSlice";
import Utils from "@/utils/Utils";
import Alert from "@/utils/Alert";
function UpdateInfoDialog({ openModal, toggleOpen }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [userInfo, setUserInfo] = useState(null);
  const [userCard, setUserCard] = useState(null);
  const [phone, setPhone] = useState(null);
  const uploadCMND = (file) => {
    setUserCard({ ...userCard, CMND: file });
  };
  const uploadGPLX = (file) => {
    setUserCard({ ...userCard, GPLX: file });
  };
  const handleCheck = async () => {
    const validateInfoCard = (cmnd, gplx) => {
      if (!cmnd || !gplx) {
        Alert.showError("Vui lòng nhập đầy đủ");
        return false;
      }
      if (cmnd.name != gplx.name) {
        Alert.showError("Giấy phép của bạn không trùng khớp. Thử lại!");
        return false;
      }
      return true;
    };
    // nếu không có gì xảy ra
    if (!userCard && !phone) {
      Alert.showError("Vui lòng nhập ít nhất là số điện thoại");
      return;
    }
    if (userCard && !userInfo) {
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
        if (userInfo.CMND && user.GPLX) {
          // nếu giấy CMND không trùng với GPLX thì lỗi
          return validateInfoCard(userInfo.CMND, userInfo.GPLX);
        } else {
          // trường hợp 1 trong 2 cập nhật => so sánh với user.name coi trùng không
          // nếu không trùng thì => cook
          if (
            user.name != userInfo.CMND?.name ||
            user.name != userInfo.GPLX?.name
          ) {
            Alert.showError("Thông tin giấy phép không trùng khớp. Thử lại!");
          } else {
            return true;
          }
        }
      }
    }
    // chỉ có mỗi phone thôi => return true;
    return true;
  };
  const handleUpdate = async () => {
    if (!handleCheck) return;
    // nếu không còn lỗi thì update
    const result = await updateUserInfo(userInfo, phone);
    if (result) {
      Utils.setLocalAuth(result.jwt, result.refreshToken);
      // đáng ra phải viết 1 reducer để update user info nhưng mà lười quá dùng login luôn
      dispatch(login(user))
      Alert.showAlertDialog("Thành công", "Cập nhật thông tin thành công");
    } else {
      Alert.showAlertDialog("Lỗi cập nhật", "Vui lòng thử lại !", "error");
    }
  };
  const checkPersonalID = async () => {
    // idr = id recognition
    if (!userCard || !userCard.CMND) return;
    const idr = await getCMNDData(userCard?.CMND);
    if (idr == null || idr == -1) {
      Alert.showToast("Không thể đọc CCCD", "error");
    } else {
      const CMND = {
        id: idr.id,
        name: idr.name,
      };
      setUserInfo({ ...userInfo, CMND });
    }
  };
  const checkDrivingLicense = async () => {
    if (!userCard || !userCard.GPLX) return;
    // dlr = driving license recognition
    const dlr = await getGPLXData(userCard?.GPLX);
    if (dlr == null || dlr == -1) {
      Alert.showToast("Không thể đọc GPLX", "error");
    } else {
      const GPLX = {
        id: dlr.id,
        name: dlr.name,
        class: dlr.class,
      };
      setUserInfo({ ...userInfo, GPLX });
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
            <div className="upload-file-recognition">
              {user && !user.CMND && (
                <InputFileUpload checkIcon={true} handleUpload={uploadCMND}>
                  CMND mặt trước
                </InputFileUpload>
              )}
              {user && !user.GPLX && (
                <InputFileUpload checkIcon={true} handleUpload={uploadGPLX}>
                  GPLT mặt trước
                </InputFileUpload>
              )}
            </div>
            <TextField
              autoFocus
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              {!userInfo ? "Kiểm tra" : "Cập nhật"}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    </>
  );
}

export default UpdateInfoDialog;
