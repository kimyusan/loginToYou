import React, { useState } from "react";
import { BurgerButton } from "../styles/common/hamburger";
import Navbar from "../components/Navbar";
import UserInfoForm from "../components/UserInfo/UserInfoForm";
import TokenCheker from "../util/TokenCheker";

import { UserInfoBox } from "../styles/UserInfo/UserInfo";

type Props = {};

const UserInfo = (props: Props) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const toggleNav = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };

  return (
    <>
      <TokenCheker />
      <BurgerButton onClick={toggleNav}>☰</BurgerButton>
      <Navbar isOpen={isNavigationOpen} />
      <UserInfoBox>
        <h3>회원 정보 수정</h3>
        <UserInfoForm />
      </UserInfoBox>
    </>
  );
};

export default UserInfo;
