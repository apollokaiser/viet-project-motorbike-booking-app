import styled from "@emotion/styled";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { useState } from "react";
function InputFileUpload({ children, checkIcon, handleUpload, multiple }) {
  const [isUpload, setIsUpload] = useState(false);
  const uploadImage = (e) => {
    setIsUpload(true);
    const files = e.target.files;
    if(files){
      if(multiple) {
        handleUpload(files, false);
        return;
      } 
      const file = files[0];
      if(file)
        handleUpload(file);
    }
  };
  const removeUpload = () => {
    setIsUpload(false);
    handleUpload(null, true);
  }
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <>
      <div className="upload-file">
        <Button
          component="label"
          color="info"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          {children || "Upload Files"}
          <VisuallyHiddenInput type="file" accept=".jpg,.jpeg,.png" onChange={uploadImage} multiple={multiple} />
        </Button>
        {isUpload && checkIcon && (
          <CreditScoreIcon style={{cursor:"pointer"}} fontSize="large" color="success" onClick={removeUpload} />
        )}
      </div>
    </>
  );
}

export default InputFileUpload;
