import React, { Component } from 'react';
import axios from 'axios';

const url = "https://port-0-mobicom-sw-contest-2025-umnqdut2blqqevwyb.sel4.cloudtype.app/api/login"; // 정확한 로그인 엔드포인트로 수정 필요

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(url, {
        username: this.state.username,
        password: this.state.password,
      });

      console.log('로그인 성공:', response.data);

      localStorage.setItem('token', response.data.token);

    } catch (error) {
      console.error('로그인 실패:', error);
      this.setState({ error: '로그인 실패. 정보를 확인해주세요.' });
    }
  };

  render() {
    return (
      <div>
        <h2>Login Page</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="아이디"
            value={this.state.username}
            onChange={this.handleChange}
          /><br />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={this.state.password}
            onChange={this.handleChange}
          /><br />
          <button type="submit">로그인</button>
        </form>
        {this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
      </div>
    );
  }
}

export default Login;
