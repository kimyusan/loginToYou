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
import { useNavigate } from "react-router";
import CoupleInfo from "../../routes/CoupleInfo";

type Props = {
  cp1: UserInterface | undefined;
  cp2: UserInterface | undefined;
  cpInfo: CoupleInterface | undefined;
};

const HeaderSection = ({ cp1, cp2, cpInfo }: Props) => {
  const mName = cp1 ? (cp1.nickname ? cp1.nickname : cp1.name) : null;
  const fName = cp2 ? (cp2.nickname ? cp2.nickname : cp2.name) : null;
  const [dDay, setDday] = useState<string | null>(null);
  const naivate = useNavigate();

  const getDday = () => {
    if (!cpInfo) return;
    if (!cpInfo.startDate) {
      setDday("디데이 시작하기");
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

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    
  };

  useEffect(() => {
    getDday();
  }, [cpInfo]);

  return (
    <Header
      onClick={() => {
        naivate(`/couple_info/${cpInfo?.coupleId}`, { state: cpInfo });
      }}
    >
      <UserName>
        {mName} & {fName}
      </UserName>
      <Dday
        className={!cpInfo?.startDate ? "noDate" : null}
      >
        {cpInfo?.startDate ? `D-${dDay}` : dDay}
      </Dday>

    </Header>
  );
};

export default HeaderSection;
