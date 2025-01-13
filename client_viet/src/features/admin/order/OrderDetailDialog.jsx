import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import OrderDetail from "./components/OrderDetail";

function OrderDetailDialog({ id }) {
  const [open, setOpen] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const handleOpen = () => {
    setOpen((pre) => !pre);
    if (isUpdate) {
      window.location.reload();
    }
  };
  return (
    <>
      <React.Fragment>
        <button onClick={handleOpen} href="#" className="btn">
          View
        </button>
        <Dialog
          open={open}
          fullWidth={true}
          maxWidth="lg"
          onClose={handleOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Thông tin đơn thuê"}
          </DialogTitle>
          <DialogContent>
            <OrderDetail id={id} handle={setUpdate} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOpen}>Thoát</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}

export default OrderDetailDialog;
