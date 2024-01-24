import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@mui/material";
import { BurgerButton } from "../styles/common/hamburger";
import Navbar from "../components/Navbar";
import UserInfoForm from "../components/UserInfo/UserInfoForm";

import { UserInfoBox } from "../styles/UserInfo/UserInfo";

type Props = {};

const UserInfo = (props: Props) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const toggleNav = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };

  return (
    <>
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
