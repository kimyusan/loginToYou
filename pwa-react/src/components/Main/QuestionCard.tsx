import React, { useEffect, useState } from "react";
import { Card } from "../../styles/common/card";
import { useNavigate } from "react-router-dom";
import { axiosAuth } from "../../util/token";
import useUserStore from "../../stores/UserStore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

type Props = {};

const QuestionCard = (props: Props) => {
  const navigate = useNavigate();

  // 오늘 질문을 조회하기 위한 날짜
  // 20240204 형식의 string화
  const today = new Date();
  const todayYear = today.getFullYear().toString();
  const todayMonth = (today.getMonth() + 1).toString().padStart(2, "0");
  const todayDate = today.getDate().toString().padStart(2, "0");
  const todayToString = () => {
    return todayYear + todayMonth + todayDate;
  };
  // 오늘의 질문 조회
  const [question, setQuestion] = useState("");
  const getQuestion = () => {
    axiosAuth
      .get(`/question/get`, {
        params: { dateString: todayToString() },
      })
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((err) => console.log(err));
  };

  // 오늘의 질문 답변 유저별 조회
  // localhost:8080/question/get/answer?todayQuestionId=2&userId=16
  // 나
  const { userId, name, nickname, profileImage } = useUserStore();
  const [myAns, setMyAns] = useState<null | string>(null);
  const getMyAns = () => {
    axiosAuth
      .get(`/question/get/answer`, {
        params: { todayQuestionId: todayToString(), userId: userId },
      })
      .then((res) => setMyAns(res.data.userAnswer))
  };


  useEffect(() => {
    getQuestion();
    getMyAns();
  }, []);

  return (
    <>
      <Card className="question_card" onClick={() => navigate("/question")}>
        <div className="question">
          <p className="todays">오늘의</p>
          <div className="questionDetail">
            <p>{question}</p>
            <p className="goToAns">{myAns? <span></span> : <span>답변하기</span> }
            <KeyboardArrowRightIcon/></p>
          </div>
        </div>
        <div className="q">Q</div>
      </Card>
    </>
  );
};

export default QuestionCard;
