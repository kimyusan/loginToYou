import React from "react";
import KakaoIco from "../../styles/Login/kakao_login.png";
import { ButtonBox } from "../../styles/Invite/Compos";

function ShareButton() {
  const clickKakao = () => {
    alert("카카오 공유");
  };

  return (
    <ButtonBox className="flex">
      <img onClick={clickKakao} src={KakaoIco} alt="카카오로 공유하기" />
    </ButtonBox>
  );
}

export default ShareButton;
