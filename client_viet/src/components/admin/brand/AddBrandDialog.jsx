import BrandService from "@/services/BrandService";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { toast } from "@utils/Alert";
import React, { useState } from "react";

function AddBrandDialog({handleAddBrand}) {
  const [open, setOpen] = useState(false);
  const [brand, setBrand] = useState({
    ma_hang: "",
    ten_hang: "",
  });
  const [error, setError] = useState(false);
  const handleOpen = () => {
    setOpen((pre) => !pre);
  };
  const handleInput = (e) => {
    setBrand({ ...brand, [e.target.name]: e.target.value });
  };
  const insertBrand = async () => {
    const result = await BrandService.addBrand(brand);
    if (result) {
      handleAddBrand(result);
      setOpen(false);
      setError(false);
      toast.fire({
        icon: "success",
        title: "Thêm hãng xe thành công",
        timer: 1500,
      });
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
              id="ma_hang"
              name="ma_hang"
              label="Mã hãng"
              type="text"
              value={brand.ma_hang}
              onChange={handleInput}
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="ten_hang"
              name="ten_hang"
              label="Tên hãng"
              type="text"
              value={brand.ten_hang}
              onChange={handleInput}
              fullWidth
              variant="standard"
            />
            {
              error &&  <em style={{ color: "red"}}>
              Không thể thêm ! Vui lòng thử lại !
            </em>
            }
           
          </DialogContent>
          <DialogActions>
            <Button onClick={insertBrand}>Lưu thay đổi</Button>
            <Button onClick={handleOpen}>Thoát</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}

export default AddBrandDialog;
