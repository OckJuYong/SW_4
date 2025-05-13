import React, { useState } from "react";
import axios from "axios";

const Main = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://port-0-mobicom-sw-contest-2025-umnqdut2blqqevwyb.sel4.cloudtype.app/api/contract/1/upload-and-translate",
        { imageUrl: imageUrl } // 이미지 URL만 포함
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
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="이미지 URL 입력"
        style={{ width: "300px", marginRight: "10px" }}
      />
      <button onClick={handleSubmit}>OCR 요청 보내기</button>

      <div style={{ marginTop: "20px" }}>
        <h3>결과</h3>
        <pre>{result}</pre>
      </div>
    </div>
  );
};

export default Main;
