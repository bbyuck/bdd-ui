const downloadBlob = (data, contentDisposition, contentType) => {
  let filename = "download-file"; // 기본 파일 이름

  if (contentDisposition && contentDisposition.indexOf("attachment") !== -1) {
    // filename* 속성을 찾아 인코딩된 파일 이름 추출
    const regex = /filename\*=[^;\n]*/;
    const matches = regex.exec(contentDisposition);

    if (matches != null) {
      const encodedFilename = matches[0].split("=")[1]; // filename* 값 추출
      const decodedFilename = decodeURIComponent(
        encodedFilename.replace(/^UTF-8''/, "").replace(/['"]/g, "")
      ); // URL 디코딩
      filename = decodedFilename; // 디코딩된 파일 이름 설정
    }
  }

  const blob = new Blob([data], {
    type: contentType,
  });

  const url = window.URL.createObjectURL(blob); // blob url 생성
  const link = document.createElement("a"); // 링크 element 생성
  link.href = url;
  link.setAttribute("download", filename); // 다운로드 파일 이름 설정
  document.body.appendChild(link);
  link.click(); // 링크 다운로드
  document.body.removeChild(link); // 링크 element 제거
  URL.revokeObjectURL(link.href);
};

export { downloadBlob };
