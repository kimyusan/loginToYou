import React, { useState, useRef, useEffect } from 'react'
import MenuSection from '../components/MenuSection'

import { Title, SelectBox, OurTitle, OtherTitle, Chart, TodayQ, QuestionBox } from '../styles/BalanceGame/BalanceGame'
import { useTheme } from "styled-components";

import useUserStore from '../stores/UserStore';
import useCoupleStore from '../stores/CoupleStore';
import useAuthStore from '../stores/AuthStore';

import { BiSolidLock } from "react-icons/bi";
import { IconContext } from "react-icons";

import { axiosAuth } from '../util/token';

const BalanceGame = () => {
  const theme = useTheme();
  const { PATH } = useAuthStore();
  const { profileImage, userId, name, nickname } = useUserStore();
  const { yourProfileImage, yourId, yourName, yourNickName } = useCoupleStore();

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate().toString().padStart(2, "0"));
  const [myChoice, setMyChoice] = useState(0);
  const [todayQuestion, setTodayQuestion] = useState([]);

  useEffect(() => {
    axiosAuth.get(`/balance/get?dateString=${year}${month.toString().padStart(2, "0")}${day}`)
      .then((res) => {
        console.log(res.data)
        setTodayQuestion(res.data)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div>
      <MenuSection />
      <Title>밸런스 게임</Title>
      <TodayQ>💡 Today's Choice 💡</TodayQ>
      <QuestionBox>
        <div style={{ display: "flex" }}>
          <div className='answer1' onClick={() => setMyChoice(1)}>Q1. 짜장면</div>
          {myChoice === 1 ? <img src={profileImage} alt="나의선택" /> : null}
        </div>
        <div className='vs'>VS</div>
        <div style={{ display: "flex", width: "100%", justifyContent: "end", alignItems: "end" }}>
          {myChoice === 2 ? <img src={profileImage} alt="나의선택" /> : null}
          <div className='answer2' onClick={() => setMyChoice(2)}>Q2. 짬뽕</div>
        </div>
      </QuestionBox>
      <OurTitle>
        <div className='content'>{nickname ? nickname : name} 님의 선택</div>
        <div className='content'>{yourNickName ? yourNickName : yourName} 님의 선택</div>
      </OurTitle>

      <SelectBox>
        <div className='item'>
        </div>
        <div className='item'>
          <IconContext.Provider
            value={{ size: "6rem", color: theme.color.sub2 }}
          >
            <div className='lock'>
              <BiSolidLock></BiSolidLock>
            </div>
          </IconContext.Provider>
          <div className='content'>선택을 하면 열려요!</div>
        </div>
      </SelectBox>

      <OtherTitle>다른 유저들의 선택</OtherTitle>
      <Chart>
        <div className='middleMsg'>
          <div className='middle'>VS</div>
        </div>
        <svg width="200" height="200">
          <circle className="stroke" cx="100" cy="100" r="89" />
        </svg>
      </Chart>
    </div>
  )
}

export default BalanceGame