import React, { useState } from "react";
<<<<<<< HEAD
import { useParams } from "react-router-dom";

import {
  Wrapper,
  BurgerButton,
=======
import { useNavigate, useParams } from "react-router-dom";

import {
  Wrapper,
>>>>>>> 6bc7bc998d25daf24d2dbf789dba0b2efb4d6fff
  FirstSection,
  SecondSection,
  ThirdSection,
} from "../styles/Main/Main";

<<<<<<< HEAD
=======
import { BurgerButton } from "../styles/common/hamburger";

>>>>>>> 6bc7bc998d25daf24d2dbf789dba0b2efb4d6fff
import Navbar from "../components/Navbar";
import HeaderSection from "../components/Main/HeaderSection";
import { Card } from "../styles/common/card";
import CalendarCard from "../components/Main/CalendarCard";
import QuestionCard from "../components/Main/QuestionCard";
<<<<<<< HEAD
import Calendar from "../components/Main/Calendar";
=======
>>>>>>> 6bc7bc998d25daf24d2dbf789dba0b2efb4d6fff

const Main = () => {
  const { id } = useParams();
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
<<<<<<< HEAD

=======
>>>>>>> 6bc7bc998d25daf24d2dbf789dba0b2efb4d6fff
  const toggleNavigation = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };

<<<<<<< HEAD
  return (
    <>
      <BurgerButton onClick={toggleNavigation}>☰</BurgerButton>
=======
  const navigate = useNavigate();

  return (
    <>
      <BurgerButton onClick={toggleNavigation}>
        {isNavigationOpen ? "×" : "☰"}
      </BurgerButton>

>>>>>>> 6bc7bc998d25daf24d2dbf789dba0b2efb4d6fff
      <Navbar isOpen={isNavigationOpen} />
      <HeaderSection />
      <Wrapper>
        <FirstSection>
<<<<<<< HEAD
          <Card className="camera">
=======
          <Card
            className="camera"
            onClick={() => {
              navigate("/camera");
            }}
          >
>>>>>>> 6bc7bc998d25daf24d2dbf789dba0b2efb4d6fff
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

<<<<<<< HEAD
<ThirdSection>

</ThirdSection>

        <Calendar />
=======
        <ThirdSection></ThirdSection>

>>>>>>> 6bc7bc998d25daf24d2dbf789dba0b2efb4d6fff
      </Wrapper>
    </>
  );
};

export default Main;
