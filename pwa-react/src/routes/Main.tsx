import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Wrapper,
  FirstSection,
  SecondSection,
  ThirdSection,
} from "../styles/Main/Main";

import { BurgerButton } from "../styles/common/hamburger";

import Navbar from "../components/Navbar";
import HeaderSection from "../components/Main/HeaderSection";
import { Card } from "../styles/common/card";
import CalendarCard from "../components/Main/CalendarCard";
import QuestionCard from "../components/Main/QuestionCard";

const Main = () => {
  const { id } = useParams();
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const toggleNavigation = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };

  const navigate = useNavigate();

  return (
    <>
      <BurgerButton onClick={toggleNavigation}>
        {isNavigationOpen ? "×" : "☰"}
      </BurgerButton>

      <Navbar isOpen={isNavigationOpen} />
      <HeaderSection />
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
          <Card className="chat">
            <p className="chat_name">채팅</p>
            <p className="chat_num">N</p>
          </Card>
        </FirstSection>

        <SecondSection>
          <CalendarCard />
          <QuestionCard />
        </SecondSection>

        <ThirdSection></ThirdSection>

      </Wrapper>
    </>
  );
};

export default Main;
