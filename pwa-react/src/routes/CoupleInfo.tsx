import React, { useEffect, useState } from "react";
import { BurgerButton } from "../styles/common/hamburger";
import Navbar from "../components/Navbar";
import CoupleInfoName from "../components/CoupleInfo/CoupleInfoName";
import CoupleInfoCalendar from "../components/CoupleInfo/CoupleInfoCalendar";
import { SaveButton } from "../styles/UserInfo/UserInfo";

import { UserInfoBox } from "../styles/UserInfo/UserInfo";
import { useLocation } from "react-router";

function CoupleInfo() {
  const [cpName, setCpName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const toggleNav = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };
  const { state } = useLocation();

  useEffect(() => {
    state.name && setCpName(state.name);
    state.startDate && setStartDate(state.startDate);
  }, []);

  return (
    <>
      <BurgerButton onClick={toggleNav}>☰</BurgerButton>
      <Navbar isOpen={isNavigationOpen} />
      <UserInfoBox>
        <h3>커플 정보 수정</h3>
        <form>
          <CoupleInfoName cpName={cpName} setCpName={setCpName} />
          <CoupleInfoCalendar />
          <SaveButton>변경하기</SaveButton>
        </form>
      </UserInfoBox>
    </>
  );
}

export default CoupleInfo;
