import { Box, Button } from "@mui/material";
import { useState } from "react";
import FileUpload from "./FileUpload";
import api from "../api";
import { downloadBlob } from "../util";

export default function OrderRow({ target, trackingNumberFile }) {
  const [value, setValue] = useState(null);
  const [label, setLabel] = useState(
    target === "coupang" ? "쿠팡" : target === "naver" ? "네이버" : null
  );

  const transformToCnp = () => {
    if (!value) {
      alert("파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("order", value);

    api
      .post(`/excel/${target}/cnp/transform`, formData, {
        responseType: "blob",
      })
      .then((res) => {
        console.log(res);
        downloadBlob(
          res.data,
          res.headers["content-disposition"],
          res.headers["content-type"]
        );
      });
  };

  const enterTrackingNumber = () => {
    alert("운송장번호 입력");
  };

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
        target={target}
        selectFile={setValue}
        allowedExtension={["xlsx"]}
      />
      <Button
        sx={{
          marginLeft: "10px",
        }}
        variant="outlined"
        onClick={transformToCnp}
      >
        CNP 변환
      </Button>
      <Button
        sx={{
          marginLeft: "10px",
        }}
        variant="outlined"
        onClick={enterTrackingNumber}
      >
        운송장 번호 입력
      </Button>
    </Box>
  );
}
