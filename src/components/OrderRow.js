import { Box, Button } from "@mui/material";
import { useState } from "react";
import FileUpload from "./FileUpload";
import api from "../api";
import { downloadBlob } from "../util";

export default function OrderRow({ target, trackingNumberFile }) {
  const [orderFile, setOrderFile] = useState(null);
  const [label, setLabel] = useState(
    target === "coupang" ? "쿠팡" : target === "naver" ? "네이버" : null
  );

  const transformToCnp = () => {
    if (!orderFile) {
      alert(`${label} 주문서 파일을 선택해주세요.`);
      return;
    }

    const formData = new FormData();
    formData.append("order", orderFile);

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
    if (!orderFile) {
      alert(`${label} 주문서 파일을 선택해주세요.`);
      return;
    }

    if (!trackingNumberFile) {
      alert("운송장 번호 엑셀 파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("order", orderFile);
    formData.append("trackingNumber", trackingNumberFile);

    api
      .post(`/excel/${target}/tracking-number/enter`, formData, {
        responseType: "blob",
      })
      .then((res) => {
        console.log(res);
        downloadBlob(
          res.data,
          res.headers["content-disposition"],
          res.headers["content-type"]
        );
      })
      .catch((error) => {
        alert("파일 처리중 에러가 발생했습니다.");
      });
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
        selectFile={setOrderFile}
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
