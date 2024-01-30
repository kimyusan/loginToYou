import React, { useEffect, useState } from "react";
import { BurgerButton } from "../styles/common/hamburger";
import Navbar from "../components/Navbar";
import CoupleInfoName from "../components/CoupleInfo/CoupleInfoName";
import CoupleInfoCalendar from "../components/CoupleInfo/CoupleInfoCalendar";
import { SaveButton } from "../styles/UserInfo/UserInfo";

import { UserInfoBox } from "../styles/UserInfo/UserInfo";
import { useLocation } from "react-router";
import useCoupleStore from "../stores/CoupleStore";

function CoupleInfo() {
  const couple = useCoupleStore();

  const [cpName, setCpName] = useState<string | null>(couple.name);
  const [start, setStart] = useState<string | null>(couple.startDate);
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const toggleNav = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };

  const changeCouple = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    couple.setCouple({
      coupleId: couple.coupleId,
      name: cpName,
      startDate: start,
      fuserId: couple.fuserId,
      suserId: couple.suserId,
    });
  };

  return (
    <>
      <BurgerButton onClick={toggleNav}>☰</BurgerButton>
      <Navbar isOpen={isNavigationOpen} />
      <UserInfoBox>
        <h3>커플 정보 수정</h3>
        <form onSubmit={changeCouple}>
          <CoupleInfoName cpName={cpName} setCpName={setCpName} />
          <CoupleInfoCalendar start={start} setStart={setStart} />
          <SaveButton type="submit">변경하기</SaveButton>
        </form>
      </UserInfoBox>
    </>
  );
}

export default CoupleInfo;
