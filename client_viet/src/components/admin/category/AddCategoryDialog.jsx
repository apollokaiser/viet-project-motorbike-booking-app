import CategoryService from "@/services/CategoryService";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Alert from "@utils/Alert";
import Utils from "@utils/Utils";
import React, { useState } from "react";

function AddCategoryDialog({handleAddCategory}) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState({
    ma_loai: "",
    ten_loai: "",
  });
  const [error, setError] = useState(false);
  const handleOpen = () => {
    setOpen((pre) => !pre);
  };
  const handleInput = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };
  const insertCategory = async () => {
    const result = await CategoryService.addCategory(category);
    if (result) {
      handleAddCategory(result);
      setOpen(false);
      setError(false);
      Alert.showToast("Thêm loại xe thành công");
    } else {
      setError(true);
    }
  };
  return (
    <>
      <React.Fragment>
        <span onClick={handleOpen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
            />
          </svg>
        </span>
        <Dialog
          open={open}
          fullWidth={true}
          maxWidth="xs"
          onClose={handleOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Thêm hãng xe"}</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="ma_loai"
              name="ma_loai"
              label="Mã loại"
              type="text"
              value={category.ma_loai}
              onChange={handleInput}
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="ten_loai"
              name="ten_loai"
              label="Tên loại"
              type="text"
              value={category.ten_loai}
              onChange={handleInput}
              fullWidth
              variant="standard"
            />
            {error && (
              <em style={{ color: "red" }}>
                Không thể thêm ! Vui lòng thử lại !
              </em>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={insertCategory}>Lưu thay đổi</Button>
            <Button onClick={handleOpen}>Thoát</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}

export default AddCategoryDialog;
