import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

function UpdateFineDialog({ open, fine, handleOpen, handleChange}) {
  const [fineUpdate,setFineUpdate] = useState(fine);
  console.log(open, fine);
  const handeUpdate = () =>{
    handleChange(fineUpdate);
  }
  const handleChangeInput = (event) => {
    if(event)
    setFineUpdate({...fineUpdate, [event.target.name]: event.target.value });
  };
  return (
    <>
      <React.Fragment>
        <Dialog
          open={open!=false}
          maxWidth="xs"
          onClose={() => handleOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`Phạt lỗi`}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Thông tin và tiền phạt cho các vấn đề phát sinh khi giao xe
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="ly_do_phat"
              name="ly_do_phat"
              label="Lý do phạt"
              value={fineUpdate?.ly_do_phat}
              onChange={handleChangeInput}
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="tien_phat"
              name="tien_phat"
              label="Tiền phạt"
              value={fineUpdate?.tien_phat}
              onChange={handleChangeInput}
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleOpen(false)}>Thoát</Button>
            <Button onClick={handeUpdate}>Xác nhận</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}

export default UpdateFineDialog;
