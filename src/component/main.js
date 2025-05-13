import React, { Component } from 'react';
import axios from "axios";

class Test2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      loading: false,
      error: null,
      imageFile: null
    };
  }

  handleFileChange = (e) => {
    this.setState({ imageFile: e.target.files[0] });
  };

  handleUpload = async () => {
    const { imageFile } = this.state;
    if (!imageFile) {
      this.setState({ error: "이미지를 선택해주세요." });
      return;
    }

    this.setState({ loading: true, error: null });

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("userId", 1); // 고정된 ID

    try {
      const response = await axios.post(
        "https://port-0-mobicom-sw-contest-2025-umnqdut2blqqevwyb.sel4.cloudtype.app/api/contract/1/upload-and-translate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log(response.data);
      this.setState({ location: response.data, loading: false });
    } catch (error) {
      console.error(error);
      this.setState({ error: "업로드 실패", loading: false });
    }
  };

  render() {
    const { location, loading, error } = this.state;

    return (
      <div>
        <h2>이미지 업로드 및 분석</h2>
        <input type="file" accept="image/*" onChange={this.handleFileChange} />
        <button onClick={this.handleUpload}>업로드</button>

        {loading && <p>로딩 중...</p>}
        {error && <p style={{ color: "red" }}>에러: {error}</p>}
        {location && (
          <div>
            <h3>응답 결과:</h3>
            <pre>{JSON.stringify(location, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }
}

export default Test2;
