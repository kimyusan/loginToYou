import React, { useState, useRef, useEffect } from 'react'
import MenuSection from '../components/MenuSection'

import { Title, SelectBox, OurTitle, OtherTitle, Chart, TodayQ, QuestionBox, ReRender, ChartContent } from '../styles/BalanceGame/BalanceGame'
import { useTheme } from "styled-components";

import useUserStore from '../stores/UserStore';
import useCoupleStore from '../stores/CoupleStore';

import { BiSolidLock } from "react-icons/bi";
import { IconContext } from "react-icons";
import { MdOutlineRefresh } from "react-icons/md";

import { axiosAuth } from '../util/token';
import { useNavigate } from 'react-router';

const BalanceGame = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { profileImage, userId, name, nickname } = useUserStore();
  const { yourProfileImage, yourId, yourName, yourNickName } = useCoupleStore();

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate().toString().padStart(2, "0"));
  const [myChoice, setMyChoice] = useState("");
  const [yourChoice, setYourChoice] = useState("");

  const [qId, setQId] = useState(-1);
  const [q1, setQ1] = useState("")
  const [q2, setQ2] = useState("")
  const [Rate, setRate] = useState(0);

  const [reFresh, setReFresh] = useState(true)
  const [chart,setChart] = useState("")

  const makeChart = (percent: number, color: string) => {
    let i = 1;
    let chartFn = setInterval(function () {
      if (i <= percent) {
        colorFn(i, color);
        i++;
      } else {
        clearInterval(chartFn);
      }
    }, 10);
  }

  const colorFn = (i: number,color:string) => {
    setChart("conic-gradient(" + color + " 0% " + i + `%, ${theme.color.point} ` + i + "% 100%)")
  }

  useEffect(() => {
    axiosAuth.get(`/balance/get?dateString=${year}${month.toString().padStart(2, "0")}${day}`)
      .then((res) => {
        setQId(res.data.balanceGameId)
        setQ1(res.data.fitem)
        setQ2(res.data.sitem)
        setRate(Math.ceil((res.data.fvote/(res.data.fvote+res.data.svote)) * 1000) / 10)

        axiosAuth.get(`/balance/get/answer?userId=${userId}&BalanceGameId=${res.data.balanceGameId}`)
          .then((res) => {
            setMyChoice(res.data.userVote)
          })
          .catch((error) => console.log(error))

        axiosAuth.get(`/balance/get/answer?userId=${yourId}&BalanceGameId=${res.data.balanceGameId}`)
          .then((res) => {
            setYourChoice(res.data.userVote)
          })
          .catch((error) => console.log(error))

        makeChart((res.data.fvote/(res.data.fvote + res.data.svote)) * 100, theme.color.sub3);
      })
      .catch((error) => console.log(error))
  }, [reFresh])

  const saveChoice = (choice: String) => {
    axiosAuth.post(`/balance/save`, {
      coupleBalanceGameId: null,
      userId,
      balanceGameId: qId,
      userVote: choice
    })
      .then((res) => {
        console.log("대답 저장 성공", res.data)
      })
      .catch((error) => console.log(error))
  }

  const reFreshBtn = () => {
    setReFresh(!reFresh);
    const icon = document.querySelector('.MdOutlineRefresh');
    icon?.classList.toggle('rotate');
    setTimeout(() => {
      icon?.classList.remove('rotate')
    }, 400)
  };

  return (
    <div>
      <MenuSection />
      <Title>밸런스 게임</Title>
      <TodayQ>💡 Today's Choice 💡</TodayQ>
      <QuestionBox>
        <div style={{ display: "flex", alignItems: "end" }}>
          <div className='answer1' onClick={() => (saveChoice(q1), setMyChoice(q1))}>Q1. {q1}</div>
          {myChoice === q1 ? <img src={profileImage} alt="나의선택" /> : null}
          {yourChoice === q1 && myChoice !== "" ? <img src={yourProfileImage} alt="상대의선택" /> : null}
        </div>
        <div className='vs'>VS</div>
        <div style={{ display: "flex", width: "100%", justifyContent: "end", alignItems: "end" }}>
          {myChoice === q2 ? <img src={profileImage} alt="나의선택" /> : null}
          {yourChoice === q2 && myChoice !== "" ? <img src={yourProfileImage} alt="상대의선택" /> : null}
          <div className='answer2' onClick={() => (saveChoice(q2), setMyChoice(q2))}>Q2. {q2}</div>
        </div>
      </QuestionBox>
      <OurTitle>
        <div className='content'>{nickname ? nickname : name} 님의 선택</div>
        <div className='content'>{yourNickName ? yourNickName : yourName} 님의 선택</div>
      </OurTitle>

      <SelectBox>
        <div className='item'>
          <div className='choice'>{myChoice}</div>
          <div></div>
        </div>
        <div className='item'>
          {myChoice === "" ? <>
            <IconContext.Provider
              value={{ size: "6rem", color: theme.color.sub2 }}
            >
              <div className='lock'>
                <BiSolidLock></BiSolidLock>
              </div>
            </IconContext.Provider>
            <div className='content'>선택을 하면 열려요!</div>
          </> : <div className={yourChoice === "" ? "choice grey" : "choice"}>
            {yourChoice === "" ? "아직 선택을 안했어요" : yourChoice}
          </div>}

        </div>
      </SelectBox>

      <ReRender>
        <IconContext.Provider
          value={{ size: "2.5rem", color: theme.color.sub2 }}
        >
          <MdOutlineRefresh onClick={reFreshBtn} className="MdOutlineRefresh"></MdOutlineRefresh>
        </IconContext.Provider>
      </ReRender>

      <OtherTitle>다른 유저들의 선택</OtherTitle>

      <Chart style={{ background: chart}}>
        <span className="center">vs</span>
      </Chart>

      <ChartContent>
        <div className='ct' style={{ background: theme.color.sub3, color: theme.color.point}}>{q1} ({Rate}%)</div>
        <div className='ct' style={{ background: theme.color.point, color: theme.color.sub3}}>{q2} ({100-Rate}%)</div>
      </ChartContent>
    </div>
  )
}

export default BalanceGame