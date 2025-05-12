import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nationality: "",
    language: "",
    workLocation: "",
    experienceYears: 0,
    role: "USER",
  });

  // URL 끝의 슬래시 제거 (중복 슬래시 방지)
  const url = "https://port-0-mobicom-sw-contest-2025-umnqdut2blqqevwyb.sel4.cloudtype.app";

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "experienceYears" ? parseInt(value || 0, 10) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Content-Type 헤더를 명시적으로 설정
      const response = await axios.post(
        `${url}/api/users/register`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('서버 응답:', response.data);

      // 응답에서 토큰 추출
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setMessage("회원가입 성공!");
    } catch (error) {
      console.error("Signup error:", error);
      
      // 더 자세한 오류 정보 표시
      if (error.response) {
        // 서버가 응답을 반환한 경우
        console.error("서버 응답:", error.response.data);
        console.error("상태 코드:", error.response.status);
        setMessage(`회원가입 실패: ${error.response.status} - ${error.response.data?.message || JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        console.error("요청 전송됨, 응답 없음:", error.request);
        setMessage("회원가입 실패: 서버로부터 응답이 없습니다.");
      } else {
        // 요청 설정 중 오류가 발생한 경우
        console.error("요청 설정 오류:", error.message);
        setMessage(`회원가입 실패: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <input 
            type="text" 
            name="username" 
            placeholder="아이디" 
            value={formData.username}
            onChange={handleChange} 
            style={{ width: "100%", padding: "0.5rem" }}
            required 
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <input 
            type="password" 
            name="password" 
            placeholder="비밀번호" 
            value={formData.password}
            onChange={handleChange} 
            style={{ width: "100%", padding: "0.5rem" }}
            required 
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <input 
            type="text" 
            name="nationality" 
            placeholder="국적" 
            value={formData.nationality}
            onChange={handleChange} 
            style={{ width: "100%", padding: "0.5rem" }}
            required 
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <input 
            type="text" 
            name="language" 
            placeholder="언어" 
            value={formData.language}
            onChange={handleChange} 
            style={{ width: "100%", padding: "0.5rem" }}
            required 
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <input 
            type="text" 
            name="workLocation" 
            placeholder="작업 위치" 
            value={formData.workLocation}
            onChange={handleChange} 
            style={{ width: "100%", padding: "0.5rem" }}
            required 
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <input 
            type="number" 
            name="experienceYears" 
            placeholder="경력 (년)" 
            value={formData.experienceYears}
            onChange={handleChange} 
            style={{ width: "100%", padding: "0.5rem" }}
            required 
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: "100%", 
              padding: "0.5rem", 
              backgroundColor: loading ? "#ccc" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "가입 중..." : "회원가입"}
          </button>
        </div>
      </form>
      {message && <p style={{ color: message.includes("성공") ? "green" : "red" }}>{message}</p>}
      
      {/* 디버깅용 현재 폼 데이터 표시 */}
      <div style={{ marginTop: "2rem", fontSize: "0.8rem", color: "#666" }}>
        <p>디버깅 정보:</p>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Signup;