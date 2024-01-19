import React from "react";
import { UserInterface } from "../interface/UserInterface";
import { Wrapper } from "../styles/Invite/Compos";
import { LongButton } from "../styles/Invite/UI";
import defaultProf from "../styles/Invite/prof.png";
import { useNavigate } from "react-router-dom";

const testUser: UserInterface = {
  userId: 1,
  email: "ssafy@ssafy.com",
  name: "김싸피",
  mobile: null,
  birthday: null,
  gender: null,
  coupleId: null,
  nickname: null,
  profileImage:
    "https://dimg.donga.com/wps/NEWS/IMAGE/2023/12/15/122638071.2.jpg",
};

function Invited() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <img
        src={testUser.profileImage ? testUser.profileImage : defaultProf}
        alt="프로필사진"
        className="prof-img mb-30"
      />
      <div>
        <span className="ft-bd">{testUser.name}</span>님께 로그인 하시겠습니까?
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
          navigate("/invite");
        }}
      >
        취소
      </LongButton>
    </Wrapper>
  );
}

export default Invited;
