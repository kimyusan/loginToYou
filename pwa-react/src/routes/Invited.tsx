import React, { useEffect } from "react";
import { Wrapper } from "../styles/Invite/Compos";
import { LongButton } from "../styles/Invite/UI";

import { useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../stores/AuthStore";
import useUserStore from "../stores/UserStore";

function Invited() {
  const navigate = useNavigate();
  const { user_id, user_name } = useParams();
  const { userId } = useUserStore();
  const { isLogIn } = useAuthStore();

  useEffect(() => {
    if (!isLogIn) navigate("/login?redirect");
    if (userId == Number(user_id)) navigate("/");
  }, []);

  return (
    <Wrapper>
      <div>
        <span className="ft-bd">{user_name}</span>님께 로그인 하시겠습니까?
      </div>
      <div className="fc-grey mb-30">(수락 시 연인 관계로 등록됩니다.)</div>
      <LongButton
        onClick={() => {
          navigate("/main");
        }}
      >
        확인
      </LongButton>
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
