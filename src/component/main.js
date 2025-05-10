import React, { useState, useEffect } from "react";
import axios from "axios";

const Main = () => {
  const [result, setResult] = useState("");
  const [inputData, setInputData] = useState("");
  const URL = "https://port-0-mobicom-sw-contest-2025-umnqdut2blqqevwyb.sel4.cloudtype.app/";
  const [userId, setUserId] = useState(1);
  const [test, setTest] = useState({
    id: "testId",
    pw: "testPw",
  });

  const handleGet = async () => {
    try {
      const response = await axios.get(URL);
      setResult("GET 결과: " + JSON.stringify(response.data));
      console.log(response.data);
    } catch (error) {
      setResult("GET 에러: " + error.message);
      console.log(error);
    }
  };

  const handlePost = async () => {
    try {
      const response = await axios.post(URL, test);
      setResult("POST 결과: " + JSON.stringify(response.data));
      console.log("POST 응답:", response.data);
    } catch (error) {
      setResult("POST 에러: " + error.message);
      console.log("POST 에러:", error.message);
      console.log("현재 test 상태:", test);
    }
  };

  const handlePut = async () => {
    try {
      const updatedTest = { ...test, pw: "updatedPw" };
      const response = await axios.put(URL + userId, updatedTest);
      setResult("PUT 결과: " + JSON.stringify(response.data));
      console.log("PUT 응답:", response.data);
    } catch (error) {
      setResult("PUT 에러: " + error.message);
      console.log("PUT 에러:", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(URL + "delete/" + userId);
      setResult("DELETE 결과: " + JSON.stringify(response.data));
      console.log("DELETE 응답:", response.data);
    } catch (error) {
      setResult("DELETE 에러: " + error.message);
      console.log("DELETE 에러:", error.message);
    }
  };

  useEffect(() => {
    setTest((prevTest) => ({
      ...prevTest,
      id: inputData || "testId",
    }));
  }, [inputData]);

  useEffect(() => {
    console.log("test 상태 변경됨:", test);
  }, [test]);

  return (
    <div>
      <h2>API 테스트 페이지</h2>
      <div>
        <input
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder="아이디 입력"
        />
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="사용자 ID"
        />
      </div>
      <div>
        <button onClick={handleGet}>GET</button>
        <button onClick={handlePost}>POST</button>
        <button onClick={handlePut}>PUT</button>
        <button onClick={handleDelete}>DELETE</button>
      </div>
      <div>
        <h3>결과:</h3>
        <p>{result}</p>
        <h4>현재 POST 데이터:</h4>
        <pre>{JSON.stringify(test, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Main;
