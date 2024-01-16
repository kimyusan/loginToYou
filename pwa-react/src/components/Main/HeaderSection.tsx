import React from "react";
import { Header } from "../../styles/common/header";
import bgimg from "../../styles/Main/header.webp";

type Props = {};

const HeaderSection = (props: Props) => {
  return (
    <Header bgimg={bgimg}>
      <div>캐릭캐릭체인지</div>
      <span>채팅</span>
    </Header>
  );
};

export default HeaderSection;
