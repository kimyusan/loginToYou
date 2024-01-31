import React, { useEffect, useState } from "react";
import axios from "axios";
import { AnsCard } from "../../styles/Question/AnswerBox";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";

import useAuthStore from "../../stores/AuthStore";
import useUserStore from "../../stores/UserStore";
import useCoupleStore from "../../stores/CoupleStore";
import useQuestionStore from "../../stores/QuestionStore";
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
  show: boolean;
  item: Answer[];
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
          <Typography>{children}</Typography>
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

function AnswerCard({ show, item }: Props) {
  const { PATH, token } = useAuthStore(
    useShallow((state) => ({
      PATH: state.PATH,
      token: state.token,
    }))
  );
  const today = new Date();
  const todayMonth = (today.getMonth() + 1).toString().padStart(2, "0");
  const todayDate = today.getDate().toString().padStart(2, "0");

  // Tab 전환
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { userId, name, nickname } = useUserStore();
  const { yourName, yourNickName } = useCoupleStore();
  const { isEdit, EditMode, handleModal } = useQuestionStore();

  const [question, setQuestion] = useState();

  const openEditModal = () => {
    if (!isEdit) {
      EditMode();
    }
    handleModal();
  };

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

  useEffect(() => {
    console.log(item);
    getQuestion();
  }, []);

  return (
    <>
      <AnsCard>
        <CardContent>
          <p>
            {todayMonth}/{todayDate}
          </p>
          <p>{question}</p>
          <hr />
          {show ? null : (
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
                나의 답변
                <button onClick={openEditModal}>수정하기</button>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                상대방의 답변
              </CustomTabPanel>
            </Box>
          )}
        </CardContent>
      </AnsCard>
    </>
  );
}

export default AnswerCard;
