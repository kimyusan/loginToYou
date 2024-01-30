import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { Wrapper } from "../styles/Invite/Compos";
import { LongButton } from "../styles/Invite/UI";
import useAuthStore from "../stores/AuthStore";
import useUserStore from "../stores/UserStore";
import { useShallow } from "zustand/react/shallow";
import { parseJwt } from "../util/token";

function Invited() {
  const navigate = useNavigate();
  const { user_email, user_name } = useParams();
  const { email, setCoupleId, coupleId } = useUserStore();
  const { isLogin, PATH, token } = useAuthStore(
    useShallow((state) => ({
      isLogin: state.isLogIn,
      PATH: state.PATH,
      token: state.token,
    }))
  );
  const location = useLocation();

  useEffect(() => {
    if (!isLogin) navigate("/login", { state: location.pathname });
    // if (coupleId !== 0 && coupleId !== null) navigate("/");
    if (email == user_email) navigate("/");
  }, []);

  const createCouple = async () => {
    const res = await axios({
      url: `${PATH}/couple/create/couple/{emailA}/{emailB}`,
      method: "GET",
      params: {
        emailA: "a@a",
        emailB: "b@b",
      },
      headers: {
        Authorization: token,
      },
    });
    console.log(token ? parseJwt(token) : null);

    // setCoupleId(res.data.coupleId);
    // await axios({
    //   url: `${PATH}/chat/create`,
    //   method: "POST",
    //   params: {
    //     coupleId: res.data.coupleId,
    //   },
    // });
    // navigate("/");
  };

  return (
    <Wrapper>
      <div>
        <span className="ft-bd">{user_name}</span>님께 로그인 하시겠습니까?
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
