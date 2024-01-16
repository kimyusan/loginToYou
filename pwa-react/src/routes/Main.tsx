import React from "react";
import { useParams } from "react-router-dom";

import { Wrapper, FirstSection, SecondSection } from "../styles/Main/Main";

import { Button } from "../styles/common/button";
import { Card } from "../styles/common/card";
import HeaderSection from "../components/Main/HeaderSection";
import CameraCard from "../components/Main/CameraCard";
import GalleryCard from "../components/Main/GalleryCard";
import NoticeCard from "../components/Main/NoticeCard";
import CalendarCard from "../components/Main/CalendarCard";
import Calendar from "../components/Main/Calendar";

const Main = () => {
  const { id } = useParams();
  return (
    <>
      <HeaderSection />

      <Wrapper>
        <FirstSection>
          <CameraCard />
          <GalleryCard />
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
