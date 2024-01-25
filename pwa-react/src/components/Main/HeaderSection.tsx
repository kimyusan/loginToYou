import React, { useEffect, useState } from "react";
import {
  Header,
  UserName,
  Dday,
  DdayModal,
  DdayInput,
  DdayForm,
  SaveDday,
} from "../../styles/Main/Header";
import useUserStore from "../../stores/UserStore";
import { UserInterface, CoupleInterface } from "../../interface/UserInterface";

type Props = {
  cp1: UserInterface | undefined;
  cp2: UserInterface | undefined;
  cpInfo: CoupleInterface | undefined;
};

const HeaderSection = ({ cp1, cp2, cpInfo }: Props) => {
  const mName = cp1 ? (cp1.nickname ? cp1.nickname : cp1.name) : null;
  const fName = cp2 ? (cp2.nickname ? cp2.nickname : cp2.name) : null;
  const [dDay, setDday] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const getDday = () => {
    if (!cpInfo) return;
    if (!cpInfo.startDate) {
      setDday("우리가 시작한 날짜를 입력해주세요.");
      return;
    }

    const today = new Date().getTime();
    let temp = cpInfo.startDate.split("-");
    let date = new Date(
      Number(temp[0]),
      Number(temp[1]) - 1,
      Number(temp[2])
    ).getTime();

    setDday(Math.round((today - date) / 1000 / 60 / 60 / 24).toString());
  };

  useEffect(() => {
    getDday();
  }, [cpInfo?.startDate]);

  return (
    <Header>
      <UserName>
        {mName} & {fName}
      </UserName>
      <Dday
        className={!cpInfo?.startDate ? "noDate" : null}
        onClick={() => setIsOpen(true)}
      >
        {cpInfo?.startDate ? `D-${dDay}` : dDay}
      </Dday>
      <DdayModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
      >
        <DdayForm>
          <p>디데이 설정하기</p>
          <DdayInput type="date" />
          <SaveDday variant="contained">Contained</SaveDday>
        </DdayForm>
      </DdayModal>
    </Header>
  );
};

export default HeaderSection;
