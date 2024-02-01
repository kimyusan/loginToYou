import React, { useEffect, useState } from "react";
import { AnswerContainer } from "../../styles/Question/AnswerBox";
import AnswerCard from "./AnswerCard";
import useAuthStore from "../../stores/AuthStore";
import useUserStore from "../../stores/UserStore";
import { useShallow } from "zustand/react/shallow";
import axios from "axios";
import useQuestionStore from "../../stores/QuestionStore";

interface Answer {
  coupleId: number;
  coupleTodayQuestionId: number;
  registerDate: string;
  todayQuestionId: number;
  userAnswer: string;
  userId: number;
}

type Props = {
  show: boolean;
  year: number;
  month: number;
};

const QuestionBox = ({ show, year, month }: Props) => {
  const { PATH, token } = useAuthStore(
    useShallow((state) => ({
      PATH: state.PATH,
      token: state.token,
    }))
  );
  const { coupleId } = useUserStore();
  const { isOpen } = useQuestionStore();
  const [filteredAnswer, setFilteredAnswer] = useState<Answer[][]>([]);
  const idx = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  // 답변 조회하기
  const getAnswers = () => {
    axios
      .get(`${PATH}/question/get/answers`, {
        params: { coupleId: coupleId },
        headers: { Authorization: token },
      })
      .then((res) => {
        const data: Answer[][] = [];

        const a = res.data.filter(
          (item: Answer) =>
            item.todayQuestionId.toString().substr(0, 6) ===
            `${year}${month.toString().padStart(2, "0")}`
        );
        for (let i = 1; i < idx[month - 1] + 1; i++) {
          const b = a.filter(
            (item: Answer) =>
              item.todayQuestionId.toString() ===
              `${year}${month.toString().padStart(2, "0")}${i
                .toString()
                .padStart(2, "0")}`
          );
          if (b.length > 0) {
            data.push(b);
          }
        }
        setFilteredAnswer(data);
      })
      .catch((err) => console.log(err));
  };


  // year과 month가 변할 때 조회
  useEffect(() => {
    getAnswers();
    console.log(filteredAnswer)
  }, [year, month, isOpen]);

  return (
    <>
      <AnswerContainer>
        {filteredAnswer?.map((item, idx) => {
          return <AnswerCard key={idx} show={show} item={item} month={month} />;
        })}
      </AnswerContainer>
    </>
  );
};

export default QuestionBox;
