import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { LoginBox } from "../../styles/Login/Login";
import { axiosAuth, parseJwt } from "../../util/token";
import { setClientHeaders } from "../../util/token";
import { useShallow } from "zustand/react/shallow";

import useAuthStore from "../../stores/AuthStore";
import useUserStore from "../../stores/UserStore";
import { application } from "express";

import "../../notification/settingFCM";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const { login, PATH, setToken, token, refToken, setTokenExpireTime } =
    useAuthStore(
      useShallow((state) => ({
        login: state.login,
        PATH: state.PATH,
        setToken: state.setToken,
        token: state.token,
        refToken: state.refToken,
        setTokenExpireTime: state.setTokenExpireTime,
      }))
    );
  const navigate = useNavigate();
  const path = useLocation();
  const { state } = useLocation();
  const setUser = useUserStore.getState().setUser;

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

    let data = new FormData();
    data.append("username", id);
    data.append("password", pw);

    axios
      .post(`${PATH}/login`, data)
      .then((response) => {
        console.log("로그인 성공", response);
        setToken(response.headers.authorization, response.headers.refreshtoken);
        setTokenExpireTime(new Date().getTime());
        setClientHeaders(response.headers.authorization);

        login();

        const userData = parseJwt(response.headers.authorization);
        setUser(userData);

        if (state) {
          navigate(state);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error.response);
        alert("아이디 또는 비밀번호를 확인해주세요!");
      });
  };

  return (
    <LoginBox>
      <form onSubmit={goLogin}>
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
