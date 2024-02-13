import { useEffect, useState } from "react";

import MenuSection from "../components/MenuSection";
import ChallengeItem from "../components/Challenge/ChallengeItem";

import useAuthStore from "../stores/AuthStore";
import useUserStore from "../stores/UserStore";
import { useShallow } from "zustand/react/shallow";

import TokenCheker from "../util/TokenCheker";
import { axiosAuth } from "../util/token";

import { Title } from "../styles/BalanceGame/BalanceGame";
import { ChallengeSelect } from "../styles/Challenge/Challenge";

import { Fade } from "react-awesome-reveal"

export interface challengeInfo {
  challengeListId: number;
  challengeProgressId: number;
  challengeTypeId: number;
  content: string;
  continuous: boolean;
  done: boolean;
  goal: number;
  prevDate: string;
  progress: number;
  subject: string;
  type: string;
  userId: number;
}

const Challenge = () => {
  // 챌린지 요청 받아올 배열
  const [attendChallenge, setAttendChallenge] = useState([]);
  const [diaryChallenge, setDiaryChallenge] = useState([]);

  const [attendShow, setAttendShow] = useState(false);
  const [diaryShow, setDiaryShow] = useState(false);

  // PATH, token 가져오기
  const { PATH } = useAuthStore(
    useShallow((state) => ({
      PATH: state.PATH,
    }))
  );

  const { userId } = useUserStore(
    useShallow((state) => ({
      userId: state.userId
    }))
  );

  // 유저별 챌린지 리스트 요청
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth"
    });

    axiosAuth.post(`${PATH}/challenge/add/progress?userId=${userId}&type=attendance`)
      .then((res) => console.log(res.data, "출석체크 성공"))
      .catch((error) => console.log(error.response))

    axiosAuth.get(`${PATH}/challenge/get/challenges?userId=${userId}`)
      .then((res) => {
        setAttendChallenge(res.data.filter((item: any) => item.type === "attendance"))
        setDiaryChallenge(res.data.filter((item: any) => item.type === "diary"))
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, []);

  return (
    <>
      <TokenCheker />
      <MenuSection />
      <Title style={{ margin: "30px 0" ,marginBottom: "50px"}}>챌린지</Title>

      <Fade>
        <ChallengeSelect>
          {!attendShow ? <div className="item img1" onClick={() => (setAttendShow(true), setDiaryShow(false))}>
            <div className="main_content">출석체크</div>
            <div className="sub_content">챌린지</div>
          </div> : <div className="item scroll">
            {attendChallenge.map((challenge: challengeInfo, index) => (
              <Fade cascade>
                <ChallengeItem key={index} challenge={challenge} />
              </Fade>
            ))}
          </div>}

          {!diaryShow ? <div className="item img2" onClick={() => (setAttendShow(false), setDiaryShow(true))}>
            <div className="main_content">다이어리</div>
            <div className="sub_content">챌린지</div>
          </div> : <div className="item scroll">
            
            {diaryChallenge.map((challenge: challengeInfo, index) => (
              <Fade cascade>
                <ChallengeItem key={index} challenge={challenge} />
              </Fade>
            ))}
          </div>}
        </ChallengeSelect>
      </Fade>
    </>
  );
};

export default Challenge;
