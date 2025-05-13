import React, { Component } from "react";
import axios from "axios";

class Main extends Component {
  componentDidMount() {
    this.fetchLocation();
  }

  fetchLocation = async () => {
    const token = localStorage.getItem("token");
    const userId = 1; // 고정된 유저 ID
    const cropId = 3; // 임시 crop ID

    // 예시 이미지 Blob 생성 (실제로는 File 혹은 Blob 객체를 사용)
    const dummyImage = new Blob(["image data"], { type: "image/png" });

    const formData = new FormData();
    formData.append("image", dummyImage); // 이미지 파일 첨부

    try {
      const response = await axios.post(
        `http://43.201.122.113:8081/api/farm/ai-recommendation?userId=${userId}&cropId=${cropId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("✅ 이미지 전송 완료:", formData.get("image"));
      console.log("📦 서버 응답:", response.data);
    } catch (error) {
      console.error("❌ 전송 실패:", error);
    }
  };

  render() {
    return (
      <div>
        <h3>AI 추천 요청 중...</h3>
      </div>
    );
  }
}

export default Main;
