import React, { useState } from 'react'
import axios from 'axios';

const LoginForm = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

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

    axios.post("http://192.168.100.83:9090/auth/authenticate", {
      email: id,
      password: pw,
    })
      .then((response) => {
        console.log(response.data)
        // localStorage.setItem("access_token", response.data.accessToken)
      })
      .catch((error) => {
        console.log(error.response)
        alert("아이디 또는 비밀번호를 확인해주세요!")
      })
  }

  return (
    <div>
      <form onSubmit={goLogin}>
        <input placeholder='아이디' value={id} onChange={changeId}></input>
        <input placeholder='비밀번호' type='password' value={pw} onChange={changePw}></input>
        <div><button type='submit' className='loginBtn'>로그인</button></div>
      </form>
    </div>

  )
}

export default LoginForm