import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/AuthStore";
import useUserStore from "../stores/UserStore";
import { parseJwt } from "../util/token";
import { useShallow } from "zustand/react/shallow";
import { log } from "console";

const MiddleLogin = () => {
  const navigate = useNavigate();
  const { PATH, login, token, setToken } = useAuthStore(
    useShallow((state) => ({
      PATH: state.PATH,
      login: state.login,
      token: state.token,
      setToken: state.setToken,
    }))
  );
  const setUser = useUserStore.getState().setUser;

  const idCheck = (email: String, name: String, authtoken: string | null) => {
    axios
      .get(`${PATH}/user/info?email=${email}`)
      .then((res) => {
        console.log("아이디 있음");
        if (!authtoken) return;

        const userData = parseJwt(authtoken);
        setUser(userData);

        setToken(authtoken);
        navigate("/");
        login();
      })
      .catch((error) => {
        console.log("아이디 없음");
        navigate("/signup", { state: { email, name } });
      });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");

    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = hashParams.get("access_token");

    if (code) {
      // 카카오 또는 네이버 로그인 처리
      const provider = state ? "naver" : "kakao";
      const apiUrl =
        provider === "naver"
          ? `${PATH}/login/naver`
          : provider === "kakao"
          ? `${PATH}/login/kakao`
          : null;

      if (apiUrl) {
        console.log(`${provider} 로그인 : `, code);
        const formData = new FormData();
        formData.append("code", code);

        // 네이버의 경우 state 값을 함께 전송
        if (provider === "naver" && state) {
          formData.append("state", state);
        }

        axios
          .post(apiUrl, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("로그인 성공");
            console.log(response);
            idCheck(
              response.data.email,
              response.data.name,
              response.headers?.authorization
            );
          })
          .catch((error) => {
            console.error("로그인 실패");
            console.error(error);
          });
      }
    } else if (accessToken) {
      // 구글 로그인 처리
      const googleApiUrl = `${PATH}/login/google`;

      console.log("구글 로그인 : ", accessToken);

      axios
        .post(
          googleApiUrl,
          { access_Token: accessToken },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log("Google 로그인 성공");
          idCheck(
            response.data.email,
            response.data.name,
            response.headers?.authorization
          );
        })
        .catch((error) => {
          console.error("Google 로그인 실패");
          console.error(error);
        });
    }
  }, []);

  return <div></div>;
};

export default MiddleLogin;
