import React, { useEffect, useState } from "react";
import axios from "axios";

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
import { useShallow } from "zustand/react/shallow";
import TokenCheker from "../util/TokenCheker";
import MenuSection from "../components/MenuSection";

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

  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
