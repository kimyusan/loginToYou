import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import {
  Wrapper,
  FirstSection,
  SecondSection,
  ThirdSection,
} from "../styles/Main/Main";
import { UserInterface, CoupleInterface } from "../interface/UserInterface";

import { BurgerButton } from "../styles/common/hamburger";

import Navbar from "../components/Navbar";
import HeaderSection from "../components/Main/HeaderSection";
import { Card } from "../styles/common/card";
import CalendarCard from "../components/Main/CalendarCard";
import QuestionCard from "../components/Main/QuestionCard";
import useAuthStore from "../stores/AuthStore";
import useUserStore from "../stores/UserStore";

const Main = () => {
  const { id } = useParams();
  const { PATH } = useAuthStore();
  const { coupleId } = useUserStore();
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [cp1, setCp1] = useState<UserInterface>();
  const [cp2, setCp2] = useState<UserInterface>();
  const [cpInfo, setCpInfo] = useState<CoupleInterface>();
  const toggleNavigation = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };

  // 채팅방 이동 시 roomId 조회
  const goChat = async () => {
    const res = await axios({
      url: `${PATH}/chat/enter`,
      method: "GET",
      params: {
        coupleId: coupleId,
      },
    });
    navigate(`/chat/${res.data}`);
  };

  // 메인화면 접속 시 커플 정보 조회
  const callData = async () => {
    const res = await axios({
      url: `${PATH}/couple/main`,
      method: "GET",
      params: {
        coupleId: coupleId,
      },
    });
    setCp1(res.data[0]);
    setCp2(res.data[1]);
    setCpInfo(res.data[2]);
  };

  useEffect(() => {
    callData();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <BurgerButton onClick={toggleNavigation}>
        {isNavigationOpen ? "×" : "☰"}
      </BurgerButton>

      <Navbar isOpen={isNavigationOpen} />
      <HeaderSection cp1={cp1} cp2={cp2} cpInfo={cpInfo} />
      <Wrapper>
        <FirstSection>
          <Card
            className="camera"
            onClick={() => {
              navigate("/camera");
            }}
          >
            <div>
              <p>사진</p>
              <p>찍으러 가기</p>
            </div>
          </Card>
          <Card className="diary">
            <p>다이어리</p>
          </Card>
          <Card className="chat" onClick={goChat}>
            <p className="chat_name">채팅</p>
            <p className="chat_num">N</p>
          </Card>
        </FirstSection>

        <SecondSection>
          <CalendarCard />
          <QuestionCard />
        </SecondSection>

        <ThirdSection>
          <Card className="balance_game">
            <p>밸런스게임</p>
            <p>VS</p>
          </Card>
          <Card className="challenge">
            <div>
              <p>매일</p>
              <p>챌린지</p>
            </div>
          </Card>
        </ThirdSection>
      </Wrapper>
    </>
  );
};

export default Main;
