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
  const [questionChallenge, setQuestionChallenge] = useState([]);
  const [dayChallenge, setDayChallenge] = useState([]);
  const [balanceChallenge, setBalanceChallenge] = useState([]);

  const [attendShow, setAttendShow] = useState(false);
  const [diaryShow, setDiaryShow] = useState(false);
  const [questionShow, setQusetionShow] = useState(false);
  const [dayShow, setDayShow] = useState(false);
  const [balanceShow, setBalanceShow] = useState(false);

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

    axiosAuth.get(`${PATH}/challenge/get/challenges?userId=${userId}`)
      .then((res) => {
        setAttendChallenge(res.data.filter((item: any) => item.type === "attendance"))
        setDiaryChallenge(res.data.filter((item: any) => item.type === "diary"))
        setBalanceChallenge(res.data.filter((item: any) => item.type === "balance_game"))
        setDayChallenge(res.data.filter((item: any) => item.type === "d_day"))
        setQuestionChallenge(res.data.filter((item: any) => item.type === "today_question"))
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
          {!attendShow ? <div className="item img1" onClick={() => (setAttendShow(true), setDiaryShow(false),setBalanceShow(false),setDayShow(false),setQusetionShow(false))}>
            <div className="main_content">출석체크</div>
            <div className="sub_content">챌린지</div>
          </div> : <div className="item scroll">
            {attendChallenge.map((challenge: challengeInfo, index) => (
              <Fade cascade>
                <ChallengeItem key={index} challenge={challenge} />
              </Fade>
            ))}
          </div>}

          {!diaryShow ? <div className="item img2" onClick={() => (setAttendShow(false), setDiaryShow(true),setBalanceShow(false),setDayShow(false),setQusetionShow(false))}>
            <div className="main_content">다이어리</div>
            <div className="sub_content">챌린지</div>
          </div> : <div className="item scroll">
            
            {diaryChallenge.map((challenge: challengeInfo, index) => (
              <Fade cascade>
                <ChallengeItem key={index} challenge={challenge} />
              </Fade>
            ))}
          </div>}

          {!questionShow ? <div className="item img3" onClick={() => (setAttendShow(false), setDiaryShow(false),setBalanceShow(false),setDayShow(false),setQusetionShow(true))}>
            <div className="main_content">데일리 질문</div>
            <div className="sub_content">챌린지</div>
          </div> : <div className="item scroll">
            
            {questionChallenge.map((challenge: challengeInfo, index) => (
              <Fade cascade>
                <ChallengeItem key={index} challenge={challenge} />
              </Fade>
            ))}
          </div>}

          {!dayShow ? <div className="item img4" onClick={() => (setAttendShow(false), setDiaryShow(false),setBalanceShow(false),setDayShow(true),setQusetionShow(false))}>
            <div className="main_content">디데이</div>
            <div className="sub_content">챌린지</div>
          </div> : <div className="item scroll">
            
            {dayChallenge.map((challenge: challengeInfo, index) => (
              <Fade cascade>
                <ChallengeItem key={index} challenge={challenge} />
              </Fade>
            ))}
          </div>}

          {!balanceShow ? <div className="item img5" onClick={() => (setAttendShow(false), setDiaryShow(false),setBalanceShow(true),setDayShow(false),setQusetionShow(false))}>
            <div className="main_content">밸런스게임</div>
            <div className="sub_content">챌린지</div>
          </div> : <div className="item scroll">
            
            {balanceChallenge.map((challenge: challengeInfo, index) => (
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
