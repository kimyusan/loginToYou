import React, { useEffect } from "react";
import axios from "axios";
import useAuthStore from "../stores/AuthStore";
import useUserStore from "../stores/UserStore";
import { useShallow } from "zustand/react/shallow";

function TokenCheker() {
  const { email } = useUserStore(
    useShallow((state) => ({
      email: state.email,
    }))
  );

  const { PATH, token, refToken, tokenExpireTime } = useAuthStore(
    useShallow((state) => ({
      PATH: state.PATH,
      token: state.token,
      refToken: state.refToken,
      tokenExpireTime: state.tokenExpireTime,
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
    console.log(res);
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
    console.log(tokenExpireTime - now);
    console.log(
      tokenExpireTime - now < 1000 * 30 ? "토큰 재발행 필요" : "토큰 유효"
    );
  };

  useEffect(() => {
    updateToken();
  }, []);

  return <div></div>;
}

export default TokenCheker;
