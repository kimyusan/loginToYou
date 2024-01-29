import React from "react";
import KakaoIco from "../../styles/Login/kakao_login.png";
import { ButtonBox } from "../../styles/Invite/Compos";
import axios from "axios";

function ShareButton() {
  const clickKakao = () => {
    // axios({
    //   url: 'https://kapi.kakao.com/v2/api/talk/memo/default/send',
    //   method: 'post',
    //   headers: {
    //     Authorization:
    //   }
    // })
  };

  return (
    <ButtonBox className="flex">
      <img onClick={clickKakao} src={KakaoIco} alt="카카오로 공유하기" />
    </ButtonBox>
  );
}

export default ShareButton;
