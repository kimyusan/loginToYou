import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { Wrapper } from "../styles/Invite/Compos";
import { LongButton } from "../styles/Invite/UI";
import useAuthStore from "../stores/AuthStore";
import useUserStore from "../stores/UserStore";
import { useShallow } from "zustand/react/shallow";
import { axiosAuth } from "../util/token";
import TokenCheker from "../util/TokenCheker";

function Invited() {
  const navigate = useNavigate();
  const { user_email } = useParams();
  const { email, setCoupleId, coupleId } = useUserStore();
  const { isLogin, PATH, token } = useAuthStore(
    useShallow((state) => ({
      isLogin: state.isLogIn,
      PATH: state.PATH,
      token: state.token,
    }))
  );
  const location = useLocation();
  const [userName, setUserName] = useState("");

  const getUserInfo = async () => {
    const res = await axiosAuth.get("user/info", {
      params: {
        email: user_email,
      },
    });
    if (res.data.coupleId) navigate("/main");
    setUserName((name) => res.data.name);
  };

  useEffect(() => {
    if (!isLogin) navigate("/login", { state: location.pathname });
    if (coupleId !== 0 && coupleId !== null) navigate("/");
    if (email == user_email) navigate("/");
    getUserInfo();
  }, []);

  const createCouple = async () => {
    const res = await axios({
      url: `${PATH}/couple/create/couple/{emailA}/{emailB}`,
      method: "GET",
      params: {
        emailA: user_email,
        emailB: email,
      },
      headers: {
        Authorization: token,
      },
    });

    setCoupleId(res.data.coupleId);

    await axios({
      url: `${PATH}/chat/create`,
      method: "POST",
      params: {
        coupleId: res.data.coupleId,
      },
      headers: {
        Authorization: token,
      },
    });
    navigate("/");
  };

  return (
    <Wrapper>
      <TokenCheker />
      <div>
        <span className="ft-bd">{userName}</span>님께 로그인 하시겠습니까?
      </div>
      <div className="fc-grey mb-30">(수락 시 연인 관계로 등록됩니다.)</div>
      <LongButton onClick={createCouple}>확인</LongButton>
      <LongButton
        className="white"
        onClick={() => {
          navigate("/");
        }}
      >
        취소
      </LongButton>
    </Wrapper>
  );
}

export default Invited;
