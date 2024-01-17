import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { LoginBox } from '../../styles/Login/Login';
import useAuthStore from '../../stores/AuthStore';

const LoginForm = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const {login} = useAuthStore();

  const changeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value)
  }

  const changePw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPw(event.target.value)
  }

  const goLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (id === "" || pw === "") {
      alert("아이디 또는 비밀번호를 입력해주세요!")
      return
    }

    axios.post("http://192.168.100.83:8080/user/login", {
      "username": id,
      "password": pw,
    })
      .then((response) => {
        console.log("로그인 성공" , response.data)
        login()

        // localStorage.setItem("access_token", response.data.accessToken)
      })
      .catch((error) => {
        console.log(error.response)
        alert("아이디 또는 비밀번호를 확인해주세요!")
      })
  }

  return (
    <LoginBox>
      <form onSubmit={goLogin}>
        <input placeholder='아이디' value={id} onChange={changeId}></input>
        <input placeholder='비밀번호' type='password' value={pw} onChange={changePw}></input>
        <button type='submit' className='loginBtn'>로그인</button>
        <p>아직 계정이 없으신가요? <Link to="/signup">회원가입 하러가기</Link></p>
      </form>
    </LoginBox>

  )
}

export default LoginForm