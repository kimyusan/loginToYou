import React, { useEffect, useState } from "react";
import axios from "axios";

import { BurgerButton } from "../styles/common/hamburger";
import Navbar from "../components/Navbar";
import CoupleInfoName from "../components/CoupleInfo/CoupleInfoName";
import CoupleInfoCalendar from "../components/CoupleInfo/CoupleInfoCalendar";
import { SaveButton } from "../styles/UserInfo/UserInfo";

import { UserInfoBox } from "../styles/UserInfo/UserInfo";
import { useNavigate } from "react-router-dom";
import useCoupleStore from "../stores/CoupleStore";
import useAuthStore from "../stores/AuthStore";
import { useShallow } from "zustand/react/shallow";

function CoupleInfo() {
  const navigate = useNavigate();
  const couple = useCoupleStore();
  const { PATH, token } = useAuthStore(
    useShallow((state) => ({
      PATH: state.PATH,
      token: state.token,
    }))
  );

  const [cpName, setCpName] = useState<string | null>(couple.name);
  const [start, setStart] = useState<string | null>(couple.startDate);
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const toggleNav = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };

  const changeCouple = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newInfo = {
      coupleId: couple.coupleId,
      name: cpName,
      startDate: start,
      fuserId: couple.fuserId,
      suserId: couple.suserId,
    };
    couple.setCouple(newInfo);
    axios
      .put(`${PATH}/couple/update`, newInfo, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        navigate("/");
      })
      .catch((error) => console.log(error));
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
