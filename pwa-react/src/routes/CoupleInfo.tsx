import React, { useEffect, useState } from "react";
import axios from "axios";
import { axiosAuth } from "../util/token";

import { BurgerButton } from "../styles/common/hamburger";
import Navbar from "../components/Navbar";
import CoupleInfoName from "../components/CoupleInfo/CoupleInfoName";
import CoupleInfoCalendar from "../components/CoupleInfo/CoupleInfoCalendar";
import { Alert } from "@mui/material";
import { SaveButton } from "../styles/UserInfo/UserInfo";

import { UserInfoBox } from "../styles/UserInfo/UserInfo";
import { useNavigate } from "react-router-dom";
import useCoupleStore from "../stores/CoupleStore";
import useAuthStore from "../stores/AuthStore";
import { CalendarStore } from "../stores/CalendarStore";
import { useShallow } from "zustand/react/shallow";
import TokenCheker from "../util/TokenCheker";
import MenuSection from "../components/MenuSection";
import useUserStore from "../stores/UserStore";

function CoupleInfo() {
  const navigate = useNavigate();
  const couple = useCoupleStore();
  const { userId } = useUserStore();
  const { PATH, token } = useAuthStore(
    useShallow((state) => ({
      PATH: state.PATH,
      token: state.token,
    }))
  );
  const { postEventToServer, nextId } = CalendarStore();

  const [cpName, setCpName] = useState<string | null>(couple.name);
  const [start, setStart] = useState<string | null>(couple.startDate);

  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function calculateDates(startDate: string, maxDays: number) {
    const startDateObj = new Date(startDate);
    const futureDates = [];

    for (let days = 100; days <= maxDays; days += 100) {
      const futureDate = new Date(startDateObj);
      futureDate.setDate(startDateObj.getDate() + days);

      const year = futureDate.getFullYear();
      const month = String(futureDate.getMonth() + 1).padStart(2, "0");
      const day = String(futureDate.getDate()).padStart(2, "0");
      const dateInfo = [`${year}-${month}-${day}`, days];
      futureDates.push(dateInfo);
    }
    return futureDates;
  }

  const changeCouple = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (cpName && cpName.length > 8) {
      return;
    }
    const newInfo = {
      coupleId: couple.coupleId,
      name: cpName,
      startDate: start,
      fuserId: couple.fuserId,
      suserId: couple.suserId,
    };

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

    // start날짜부터 +3000일까지 캘린더에 추가
    if (start !== couple.startDate) {
      const FutureDatesInfo = calculateDates(start as string, 3000);
      FutureDatesInfo.map((info, idx) =>
        postEventToServer(
          {
            calendarId: nextId,
            coupleId: couple.coupleId as number,
            userId: userId as number,
            startDate: info[0] as string,
            endDate: null,
            eventType: null,
            contents: `❤️${info[1]}일`,
          },
          couple.coupleId as number
        )
      );
    } else {
      return
    }
    couple.setCouple(newInfo);
  };

  useEffect(() => {
    if (cpName && cpName.length > 8) {
      setErrorAlert(true);
      setErrorMsg("커플 이름은 8글자 이내로 설정해주세요!");
    } else {
      setErrorAlert(false);
    }
  }, [cpName]);

  return (
    <>
      <TokenCheker />
      <MenuSection />
      <UserInfoBox>
        <h3>커플 정보 수정</h3>
        <Alert
          severity="error"
          style={{
            transition: "transform 0.5s",
            transform: errorAlert ? "translateY(0)" : "translateY(-100%)",
            visibility: errorAlert ? "visible" : "hidden",
            position: "absolute",
            zIndex: "1000",
            width: "70%",
          }}
        >
          {errorMsg}
        </Alert>
        <Alert
          severity="success"
          style={{
            transition: "transform 0.5s",
            transform: successAlert ? "translateY(0)" : "translateY(-100%)",
            visibility: successAlert ? "visible" : "hidden",
            position: "absolute",
            zIndex: "1000",
            width: "70%",
            verticalAlign: "center",
          }}
        >
          저장되었습니다 !
        </Alert>
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
