<<<<<<< HEAD
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoginBox } from '../../styles/Login/Login';
import useAuthStore from '../../stores/AuthStore';
=======
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { LoginBox } from "../../styles/Login/Login";

import useAuthStore from "../../stores/AuthStore";
import useUserStore from "../../stores/UserStore";
>>>>>>> 6bc7bc998d25daf24d2dbf789dba0b2efb4d6fff

const LoginForm = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
<<<<<<< HEAD
  const {login,PATH} = useAuthStore();
  const navigate = useNavigate();

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

    axios.post(`${PATH}/user/login`, {
      "email": id,
      "password": pw,
    })
      .then((response) => {
        console.log("로그인 성공" , response.data)
        login()
        navigate("/")
      })
      .catch((error) => {
        console.log(error.response)
        alert("아이디 또는 비밀번호를 확인해주세요!")
      })
  }
=======

  const { login, PATH } = useAuthStore();
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const path = useLocation();

  const changeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const changePw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPw(event.target.value);
  };

  const goLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (id === "" || pw === "") {
      alert("아이디 또는 비밀번호를 입력해주세요!");
      return;
    }

    axios
      .post(`${PATH}/user/login`, {
        email: id,
        password: pw,
      })
      .then((response) => {
        console.log("로그인 성공", response.data);

        setUser(response.data);

        login();
        path.search && path.search == "?redirect"
          ? navigate(-1)
          : navigate("/");
      })
      .catch((error) => {
        console.log(error.response);
        alert("아이디 또는 비밀번호를 확인해주세요!");
      });
  };
>>>>>>> 6bc7bc998d25daf24d2dbf789dba0b2efb4d6fff

  return (
    <LoginBox>
      <form onSubmit={goLogin}>
<<<<<<< HEAD
        <input placeholder='아이디' value={id} onChange={changeId}></input>
        <input placeholder='비밀번호' type='password' value={pw} onChange={changePw}></input>
        <button type='submit' className='loginBtn'>로그인</button>
        <p>아직 계정이 없으신가요? <Link to="/signup">회원가입 하러가기</Link></p>
      </form>
    </LoginBox>

  )
}

export default LoginForm
=======
        <input placeholder="아이디" value={id} onChange={changeId}></input>
        <input
          placeholder="비밀번호"
          type="password"
          value={pw}
          onChange={changePw}
        ></input>
        <button type="submit" className="loginBtn">
          로그인
        </button>
        <p>
          아직 계정이 없으신가요? <Link to="/signup">회원가입 하러가기</Link>
        </p>
      </form>
    </LoginBox>
  );
};

export default LoginForm;
>>>>>>> 6bc7bc998d25daf24d2dbf789dba0b2efb4d6fff
