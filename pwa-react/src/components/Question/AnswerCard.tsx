import React, { useEffect, useState } from "react";
import axios from "axios";
import { AnsCard } from "../../styles/Question/AnswerBox";
import { CardContent, Box, Tabs, Tab } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import useAuthStore from "../../stores/AuthStore";
import useUserStore from "../../stores/UserStore";
import useCoupleStore from "../../stores/CoupleStore";
import useQuestionStore from "../../stores/QuestionStore";
import QuestionModal from "./QuestionModal";
import { useShallow } from "zustand/react/shallow";

interface Answer {
  coupleId: number;
  coupleTodayQuestionId: number;
  registerDate: string;
  todayQuestionId: number;
  userAnswer: string;
  userId: number;
}
type Props = {
  item: Answer[];
  month: number;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <p>{children}</p>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function AnswerCard({ item, month }: Props) {
  const { PATH, token } = useAuthStore(
    useShallow((state) => ({
      PATH: state.PATH,
      token: state.token,
    }))
  );

  // Tab 전환
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { userId, name, nickname } = useUserStore();
  const { yourName, yourNickName } = useCoupleStore();
  const {
    isEdit,
    EditMode,
    handleModal,
    setEditAnswer,
    isOpen,
    modalQuestion,
    setModalQuestion,
    setDateString,
  } = useQuestionStore();

  const openEditModal = () => {
    if (!isEdit) {
      EditMode();
    }
    setDateString(item[0].todayQuestionId.toString());
    setEditAnswer(myAnswer);
    setModalQuestion(question);
    handleModal();
  };

  // 답변에 대한 질문
  const [question, setQuestion] = useState(null);

  // 답변에 대한 질문 조회 요청
  const getQuestion = () => {
    axios
      .get(`${PATH}/question/get`, {
        params: { dateString: item[0].todayQuestionId },
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((err) => console.log(err));
  };

  // 나의 답변
  const [myAnswer, setMyAnswer] = useState<string | null>(null);
  // 상대방의 답변
  const [yourAnswer, setYourAnswer] = useState<string | null>(null);
  // 나의 답변과 상대방의 답변을 각각 저장함
  const getAnswerByUser = () => {
    for (let i = 0; i < item?.length; i++) {
      if (item[i]?.userId === userId) {
        setMyAnswer(item[i].userAnswer);
      } else {
        setYourAnswer(item[i].userAnswer);
      }
    }
  };

  // 답변한 날짜 형식
  const ansdate = item[0]?.todayQuestionId.toString();
  const fulldate =
    ansdate.substring(0, 4) +
    "년 " +
    ansdate.substring(4, 6) +
    "월 " +
    ansdate.substring(6, 8) +
    "일";

  useEffect(() => {
    setMyAnswer(null);
    setYourAnswer(null);
    getQuestion();
    getAnswerByUser();
  }, [item, isOpen]);

  return (
    <>
      <AnsCard>
        <CardContent>
          <p className="card_date">{fulldate}</p>
          <p>{question}</p>
          {/* <hr /> */}

          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{ position: "static" }}
              >
                <Tab
                  label={nickname ? nickname : name}
                  {...a11yProps(0)}
                  sx={{ width: "50%", padding: 0 }}
                />
                <Tab
                  label={yourNickName ? yourNickName : yourName}
                  {...a11yProps(1)}
                  sx={{ width: "50%", padding: 0 }}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <div className="answer">
                {myAnswer ? <p>{myAnswer}</p> : <p>답변을 작성하지 않았어요</p>}
                <div className="edit_btn">
                  <BorderColorIcon onClick={openEditModal}>
                    수정하기
                  </BorderColorIcon>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              {yourAnswer ? yourAnswer : <p>답변을 작성하지 않았어요</p>}
            </CustomTabPanel>
          </Box>
        </CardContent>
      </AnsCard>
    </>
  );
}

export default AnswerCard;
