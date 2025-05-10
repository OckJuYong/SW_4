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

  const url = "https://port-0-mobicom-sw-contest-2025-umnqdut2blqqevwyb.sel4.cloudtype.app/"

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "experienceYears" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        url + "/api/users/register",
        formData
      );

      // Assuming you want to store tokens
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setMessage("회원가입 성공!");
    } catch (error) {
      console.error("Signup error:", error.response || error);
      setMessage("회원가입 실패: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="아이디" onChange={handleChange} required />
        <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} required />
        <input type="text" name="nationality" placeholder="국적" onChange={handleChange} required />
        <input type="text" name="language" placeholder="언어" onChange={handleChange} required />
        <input type="text" name="workLocation" placeholder="작업 위치" onChange={handleChange} required />
        <input type="number" name="experienceYears" placeholder="경력 (년)" onChange={handleChange} required />

        <button type="submit" disabled={loading}>
          {loading ? "가입 중..." : "회원가입"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
