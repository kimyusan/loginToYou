import React, { useEffect } from "react";
import axios from "axios";
import useAuthStore from "../stores/AuthStore";
import useUserStore from "../stores/UserStore";
import { useShallow } from "zustand/react/shallow";
import { stat } from "fs";

function TokenCheker() {
  const { email } = useUserStore(
    useShallow((state) => ({
      email: state.email,
    }))
  );

  const {
    PATH,
    token,
    refToken,
    tokenExpireTime,
    setToken,
    setTokenExpireTime,
  } = useAuthStore(
    useShallow((state) => ({
      PATH: state.PATH,
      token: state.token,
      refToken: state.refToken,
      tokenExpireTime: state.tokenExpireTime,
      setToken: state.setToken,
      setTokenExpireTime: state.setTokenExpireTime,
    }))
  );

  const refresh = async () => {
    const res = await axios.get(`${PATH}/reissue/token`, {
      params: {
        email: email,
      },
      headers: {
        Authorization: token,
        refreshToken: refToken,
      },
    });
    console.log(token);
    console.log(res.headers.authorization);
    const now = new Date().getTime();
    setToken(res.headers.authorization, res.headers.refreshtoken);
    setTokenExpireTime(now);
    console.log("토큰 변경 완료");
  };

  const updateToken = () => {
    if (
      email == null ||
      token == null ||
      refToken == null ||
      tokenExpireTime == null
    )
      return;
    const now = new Date().getTime();
    console.log(tokenExpireTime, now);
    console.log(`토큰 남은 시간 ${(tokenExpireTime - now) / 1000 / 60}분`);
    console.log(
      tokenExpireTime - now < 1000 * 60 * 5 ? "토큰 재발행 필요" : "토큰 유효"
    );
    if (tokenExpireTime - now < 1000 * 60 * 5) {
      refresh();
    }
  };

  useEffect(() => {
    updateToken();
  }, []);

  return <div></div>;
}

export default TokenCheker;
