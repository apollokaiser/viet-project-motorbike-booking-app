import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
  } from "@mui/material";
import Utils from "@utils/Utils";
  import React, { useState } from "react";
  
  function DeliveriedConfimDialog({handle,theChan}) {
      const [open, setOpen] = useState(false);
      const [isUpdate, setUpdate] = useState(false);
    const handleOpen = () => {
      setOpen(pre => !pre);
      if(isUpdate) {
        window.location.reload();
      }
    };
    const handleUpdate = () =>{
        handle();
        setOpen(false);
    }
    return (
      <>
        <React.Fragment>
        <button onClick={handleOpen} className="order-deliveried">
                      Xác nhận giao hàng
                    </button>
          <Dialog
            open={open}
            maxWidth="xs"
            onClose={handleOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Hoàn tất giao xe"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
            Để hoàn tất quá trình giao xe, vui lòng thanh toán (nếu có) và trả phí thế chân
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="the_chan"
            name="the_chan"
            label="Tiền thế chân"
            defaultValue={Utils.convertToVND(theChan)}
            // value={value}
            // onChange={handleChangeInput}
            type="text"
            fullWidth
            variant="standard"
            // disabled
            inputProps={
                { readOnly: true }
              }
          />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleOpen}>Thoát</Button>
              <Button onClick={handleUpdate}>Xác nhận</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </>
    );
  }
  
  export default DeliveriedConfimDialog;
  