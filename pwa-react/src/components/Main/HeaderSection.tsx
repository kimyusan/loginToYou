import React from "react";
import { Header, UserName, Dday } from "../../styles/Main/Header";

type Props = {};

const HeaderSection = (props: Props) => {
  return (
    <Header>
      <UserName>이싸피 & 김싸피</UserName>
      <Dday>D-2000</Dday>
    </Header>
  );
};

export default HeaderSection;
