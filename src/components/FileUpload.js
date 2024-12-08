import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { IconButton, TextField } from "@mui/material";
import { useState } from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";

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

FileUpload.defaultProps = {
  allowedExtension: [],
};

export default function FileUpload({ selectFile, target, allowedExtension }) {
  const [value, setValue] = useState("");
  const [label, setLabel] = useState(
    target === "coupang"
      ? "쿠팡 주문서 선택"
      : target === "naver"
      ? "네이버 주문서 선택"
      : target === "tracking-number"
      ? "운송장 번호 엑셀 선택"
      : "버튼 오류"
  );

  const handleSelect = (event) => {
    if (!allowedExtensionFileSelected(event.target.files[0])) {
      return;
    }
    selectFile(event.target.files[0]);
    setValue(event.target.files[0].name);
  };

  const allowedExtensionFileSelected = (file) => {
    const selectedFileExtension = file.name.split(".")[1];
    if (!allowedExtension.includes(selectedFileExtension)) {
      alert(
        `잘못된 파일을 선택했습니다.\n선택한 확장자 : ${selectedFileExtension}\n허용되는 확장자 : [${allowedExtension.join(
          ", "
        )}]`
      );

      return false;
    }

    return true;
  };

  const clearSelectedFile = () => {
    setValue("");
    selectFile(null);
  };

  return (
    <>
      <TextField sx={{ width: "300px" }} value={value} disabled />
      <IconButton
        onClick={clearSelectedFile}
        sx={{ position: "relative", right: "30px", width: "15px" }}
      >
        <BackspaceIcon />
      </IconButton>
      <Button
        sx={{
          width: "200px",
        }}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        {label}
        <VisuallyHiddenInput
          type="file"
          onChange={handleSelect}
          multiple={false}
        />
      </Button>
    </>
  );
}
