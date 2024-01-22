import React from "react";
import { Header, UserName, Dday } from "../../styles/Main/Header";
<<<<<<< HEAD
=======
import useUserStore from "../../stores/UserStore";
>>>>>>> 6bc7bc998d25daf24d2dbf789dba0b2efb4d6fff

type Props = {};

const HeaderSection = (props: Props) => {
<<<<<<< HEAD
  return (
    <Header>
      <UserName>이싸피 & 김싸피</UserName>
=======
  const user = useUserStore();

  return (
    <Header>
      <UserName>{user.name} & 김싸피</UserName>
>>>>>>> 6bc7bc998d25daf24d2dbf789dba0b2efb4d6fff
      <Dday>D-2000</Dday>
    </Header>
  );
};

export default HeaderSection;
