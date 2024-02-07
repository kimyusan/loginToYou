import React, { useEffect } from "react";
import KakaoIco from "../../styles/Login/kakao_login.png";
import { ButtonBox } from "../../styles/Invite/Compos";
import axios from "axios";

declare global {
  interface Window {
    Kakao: any;
  }
}

interface Props {
  inviteUrl: string;
}

function ShareButton({ inviteUrl }: Props) {
  const Kakao = window.Kakao;

  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init("610215db9e74a94f7b85696a61c6c1d5");
    }
  }, []);

  const share = () => {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "너에게 로그인🔒💕",
        description: "너의 마음에 로그인하게 해줄래?",
        imageUrl: "",
        link: {
          mobileWebUrl: inviteUrl,
          webUrl: inviteUrl,
        },
      },
      buttons: [
        {
          title: "로그인하기",
          link: {
            mobileWebUrl: inviteUrl,
            webUrl: inviteUrl,
          },
        },
      ],
      installTalk: true,
    });
  };

  return (
    <ButtonBox className="flex" onClick={share}>
      <img src={KakaoIco} alt="카카오로 공유하기" />
    </ButtonBox>
  );
}

export default ShareButton;
