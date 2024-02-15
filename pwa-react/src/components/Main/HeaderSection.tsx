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
import FavoriteIcon from "@mui/icons-material/Favorite";
import { axiosAuth } from "../../util/token";
import useAuthStore from "../../stores/AuthStore";
import useCoupleStore from "../../stores/CoupleStore";

type Props = {
  cp1: UserInterface | undefined;
  cp2: UserInterface | undefined;
  cpInfo: CoupleInterface | undefined;
};

const HeaderSection = ({ cp1, cp2, cpInfo }: Props) => {
  const mName = useUserStore.getState().nickname ? useUserStore.getState().nickname : useUserStore.getState().name
  const fName = useCoupleStore.getState().yourNickName ? useCoupleStore.getState().yourNickName : useCoupleStore.getState().yourName
  const cpName = cpInfo?.name ? cpInfo.name : null;
  const [dDay, setDday] = useState<string | null>(null);
  const naivate = useNavigate();

  const PATH = useAuthStore.getState().PATH;
  const userId = useUserStore.getState().userId;

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
      Number(temp[2].substring(0, 2))
    ).getTime();

    setDday((Math.ceil((today - date) / 1000 / 60 / 60 / 24)).toString());
    
    axiosAuth.post(`${PATH}/challenge/set/progress?userId=${userId}&type=d_day&progress=${(Math.ceil((today - date) / 1000 / 60 / 60 / 24))}`)
      .then((res : any) => {
        console.log(res.data , "디데이 챌린지 성공")
      })
      .then((error) => console.log(error))
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    getDday();
  }, [cpInfo]);

  useEffect(() => {
    
  },[])

  return (
    <body>
      <Header
        onClick={() => {
          naivate(`/couple_info/${cpInfo?.coupleId}`, { state: cpInfo });
        }}
      >
        <div className="nameSection">
          {cpName ? <div className="cpName">{cpName}</div> : null}
          <UserName>
            {mName}{" "}
            <FavoriteIcon
              fontSize="small"
              style={{ paddingLeft: "2px", paddingRight: "2px" }}
            />{" "}
            {fName}
          </UserName>
        </div>
        <Dday className={!cpInfo?.startDate ? "noDate" : null}>
          {cpInfo?.startDate ? `D+${dDay}` : dDay}
        </Dday>
      </Header>
    </body>
  );
};

export default HeaderSection;
