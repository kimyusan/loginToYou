import React, { useState } from "react";
import { useParams } from "react-router-dom";

import {
  Wrapper,
  BurgerButton,
  FirstSection,
  SecondSection,
} from "../styles/Main/Main";

import Navbar from "../components/Navbar";
import HeaderSection from "../components/Main/HeaderSection";
import { Card } from "../styles/common/card";
import NoticeCard from "../components/Main/NoticeCard";
import CalendarCard from "../components/Main/CalendarCard";
import Calendar from "../components/Main/Calendar";

const Main = () => {
  const { id } = useParams();
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  const toggleNavigation = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };

  return (
    <>
      <BurgerButton onClick={toggleNavigation}>☰</BurgerButton>
      <Navbar isOpen={isNavigationOpen} />
      <HeaderSection />
      <Wrapper>
        <FirstSection>
          <Card>사진찍기</Card>
          <Card>다이어리</Card>
          <Card>dd</Card>
        </FirstSection>

        <SecondSection>
          <NoticeCard />
          <CalendarCard />
        </SecondSection>
        <Calendar />
      </Wrapper>
    </>
  );
};

export default Main;
