import { Box, Button } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useState } from "react";
import FileUpload from "./FileUpload";

export default function TrackingNumberRow({ value, onSelect }) {
  return (
    <Box
      sx={{
        display: "flex" /* Flexbox 활성화 */,
        justifyContent: "center" /* 가로 중앙 정렬 */,
        alignItems: "center" /* 세로 중앙 정렬 */,
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <FileUpload
        target={"tracking-number"}
        selectFile={onSelect}
        allowedExtension={["xls", "xlsx"]}
      />
    </Box>
  );
}
