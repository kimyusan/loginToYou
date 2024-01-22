import React from "react";
import { Header, UserName, Dday } from "../../styles/Main/Header";
import useUserStore from "../../stores/UserStore";

type Props = {};

const HeaderSection = (props: Props) => {
  const user = useUserStore();

  return (
    <Header>
      <UserName>{user.name} & 김싸피</UserName>
      <Dday>D+2000</Dday>
    </Header>
  );
};

export default HeaderSection;
