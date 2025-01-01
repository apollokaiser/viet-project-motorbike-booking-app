import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import AddProductContent from "./AddProductContent";

function AddProductDialog() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((pre) => !pre);
  };
  return (
    <>
      <React.Fragment>
      <div onClick={handleOpen} className="toolbar-button-wrapper">
                <button
                  className="toolbar-button add-product-button"
                  id="add-product-toolbar"
                >
                  <span>Thêm xe</span>
                  <i className="bx bx-plus-medical" />
                </button>
              </div>
        <Dialog
        id="dialog-add-new-vehicle"
          open={open}
          fullScreen
          maxWidth="lg"
          onClose={handleOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Thông tin đơn thuê"}
          </DialogTitle>
          <DialogContent>
            <AddProductContent /> {/* content*/ }
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOpen}>Thoát</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}

export default AddProductDialog;
