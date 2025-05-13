import React, { useState } from "react";
import axios from "axios";

const Main = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      setResult("이미지를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file); // 서버가 'image'라는 필드로 받을 것으로 가정

    try {
      const response = await axios.post(
        "https://port-0-mobicom-sw-contest-2025-umnqdut2blqqevwyb.sel4.cloudtype.app/api/contract/1/upload-and-translate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult("에러 발생: " + error.message);
      console.error(error);
    }
  };

  return (
    <div>
      <h2>OCR 이미지 업로드</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleSubmit} style={{ marginLeft: "10px" }}>
        OCR 요청 보내기
      </button>

      <div style={{ marginTop: "20px" }}>
        <h3>결과</h3>
        <pre>{result}</pre>
      </div>
    </div>
  );
};

export default Main;
