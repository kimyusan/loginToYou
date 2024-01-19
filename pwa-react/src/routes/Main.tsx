import React, { useState } from "react";
import { useParams } from "react-router-dom";

import {
  Wrapper,
  BurgerButton,
  FirstSection,
  SecondSection,
  ThirdSection,
} from "../styles/Main/Main";

import Navbar from "../components/Navbar";
import HeaderSection from "../components/Main/HeaderSection";
import { Card } from "../styles/common/card";
import CalendarCard from "../components/Main/CalendarCard";
import QuestionCard from "../components/Main/QuestionCard";
import Calendar from "../components/Main/Calendar";

const Main = () => {
  const { id } = useParams();
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  const toggleNavigation = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };

  return (
    <>
      <BurgerButton onClick={toggleNavigation}>
        {isNavigationOpen ? "×" : "☰"}
      </BurgerButton>
      <Navbar isOpen={isNavigationOpen} />
      <HeaderSection />
      <Wrapper>
        <FirstSection>
          <Card className="camera">
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

<ThirdSection>

</ThirdSection>

        <Calendar />
      </Wrapper>
    </>
  );
};

export default Main;
