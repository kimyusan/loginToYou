import React, { useEffect, useState } from "react";
import { axiosAuth } from "../../util/token";

import { CarouselCard } from "../../styles/Main/Carousel";

import Q from "../../static/images/L-Help.png"

import Heart_p from "../../static/images/L-Heart-pink.png"
import Heart_w from "../../static/images/L-Heart-white.png";

import Check from "../../static/images/F-Check.png"
import Star from "../../static/images/L-Star.png"
import { useNavigate } from "react-router";

type Props = {
  type: string;
};

const CarouselItem = ({ type }: Props) => {
  const navigate = useNavigate()

  // 밸런스 게임 캐러설
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate().toString().padStart(2, "0");

  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const getBalance = () => {
    axiosAuth
      .get(
        `/balance/get?dateString=${year}${month
          .toString()
          .padStart(2, "0")}${day}`
      )
      .then((res) => {
        setQ1(res.data.fitem);
        setQ2(res.data.sitem);
      });
  };
  // 오늘의 질문 캐러셀
  const todayYear = today.getFullYear().toString();
  const todayMonth = (today.getMonth() + 1).toString().padStart(2, "0");
  const todayDate = today.getDate().toString().padStart(2, "0");
  const todayToString = () => {
    return todayYear + todayMonth + todayDate;
  };
  const [question, setQuestion] = useState("");
  const getQuestion = () => {
    axiosAuth
      .get(`/question/get`, {
        params: { dateString: todayToString() },
      })
      .then((res) => {
        setQuestion(res.data);
      });
  };
  // 챌린지

  useEffect(() => {
    getBalance();
    getQuestion();
  }, []);

  return (
    <>
      {type === "balancegame" ? (
        <CarouselCard onClick={()=>navigate('/balancegame')}>
          <img className="balance_image pink" src={Heart_p} alt="balance_image" />
          <img className="balance_image white small" src={Heart_w} alt="balance_image" />
          <img className="balance_image white big" src={Heart_w} alt="balance_image" />
          <p className="balance_title">오늘 너의 선택은?</p>
          <p className="balance_content">
            {q1} vs {q2}
          </p>
        </CarouselCard>
      ) : type === "question" ? (
        <CarouselCard onClick={()=>navigate('/question')}>
          <img className="q_image left" src={Q} alt="question_image" />
          <img className="q_image right" src={Q} alt="question_image" />
          <p className="q_title">Today's Question</p>
          <p className="q_content">{question}</p>
        </CarouselCard>
      ) : (
        <CarouselCard onClick={()=>navigate('/')}>
          <img className="challenge_image check" src={Check} alt="challenge_image" />
          <div className="box"></div>
          <p className="challenge_title">Let's Challenge!</p>
          <p className="challenge_content">매일 매일 도전하고, 기록해보자!</p>
        </CarouselCard>
      )}
    </>
  );
};

export default CarouselItem;
