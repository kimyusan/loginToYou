import React, { useEffect, useState } from "react";
import { Card } from "../../styles/common/card";
import { useNavigate } from "react-router-dom";
import { axiosAuth } from "../../util/token";
import useAuthStore from "../../stores/AuthStore";
import useUserStore from "../../stores/UserStore";
import useCoupleStore from "../../stores/CoupleStore";
import { useShallow } from "zustand/react/shallow";
import { Chip, Avatar } from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';



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
  const [myAns, setMyAns] = useState("답변이 등록되지 않았어요!");
  const getMyAns = () => {
    axiosAuth
      .get(`/question/get/answer`, {
        params: { todayQuestionId: todayToString(), userId: userId },
      })
      .then((res) => setMyAns(res.data.userAnswer))
      .catch((err) => console.log(err));
  };
  // 상대방
  const { yourId, yourName, yourNickName, setYourProfileImage } =
    useCoupleStore();
  const [yourAns, setYourAns] = useState("답변이 등록되지 않았어요!");
  const getYourAns = () => {
    axiosAuth
      .get(`/question/get/answer`, {
        params: { todayQuestionId: todayToString(), userId: yourId },
      })
      .then((res) => setYourAns(res.data.userAnswer))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getQuestion();
    getMyAns();
    getYourAns();
    // setYourProfileImage()
  }, []);

  return (
    <>
      <Card className="question_card" onClick={() => navigate("/question")}>
        <div className="question">
          <p>오늘의</p>
          <p>{question}<KeyboardArrowRightIcon/></p>
        </div>
        <div className="answer">
          <div className="my_answer">
            <p style={{ width: "100%"}}>
              <Chip
                avatar={<Avatar alt="my_avatar" src={profileImage} />}
                label={nickname ? nickname : name}
                variant="outlined"
              />
            </p>
            <p>{myAns}</p>
          </div>
          <div className="your_answer">
            <p style={{ width: "100%" }}>
              <Chip
                avatar={<Avatar alt="my_avatar" src={profileImage} />}
                label={yourNickName ? yourNickName : yourName}
                variant="outlined"
              />
            </p>
            <p>{yourAns}</p>
          </div>
        </div>
        <div className="q">Q</div>
      </Card>
    </>
  );
};

export default QuestionCard;
