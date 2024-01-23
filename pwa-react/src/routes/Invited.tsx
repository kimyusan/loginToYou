import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Wrapper } from "../styles/Invite/Compos";
import { LongButton } from "../styles/Invite/UI";
import useAuthStore from "../stores/AuthStore";
import useUserStore from "../stores/UserStore";

function Invited() {
  const navigate = useNavigate();
  const { user_email, user_name } = useParams();
  const { email, setCoupleId, coupleId } = useUserStore();
  const { isLogIn, PATH } = useAuthStore();

  useEffect(() => {
    if (!isLogIn) navigate("/login?redirect");
    if (coupleId !== 0) navigate("/");
    if (email == user_email) navigate("/");
  }, []);

  const createCouple = async () => {
    const res = await axios({
      url: `${PATH}/couple/create/couple`,
      method: "GET",
      params: {
        emailA: email,
        emailB: user_email,
      },
    });
    setCoupleId(res.data.couple_id);
    navigate("/");
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
