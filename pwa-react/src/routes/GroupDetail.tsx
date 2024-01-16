import React from "react";
import { useParams } from "react-router-dom";

import {
  Wrapper,
  FirstSection,
  SecondSection,
} from "../styles/GroupDetail/GroupDetailStyle";

import { Button } from "../styles/common/button";
import { Card } from "../styles/common/card";
import HeaderSection from "../components/GroupDetail/HeaderSection";
import CameraCard from "../components/GroupDetail/CameraCard";
import GalleryCard from "../components/GroupDetail/GalleryCard";
import NoticeCard from "../components/GroupDetail/NoticeCard";
import CalendarCard from "../components/GroupDetail/CalendarCard";
import Calendar from "../components/GroupDetail/Calendar";

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
