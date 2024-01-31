import React from "react";
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

import useUserStore from "../../stores/UserStore";
import useCoupleStore from "../../stores/CoupleStore";
import zIndex from "@mui/material/styles/zIndex";

type Props = { show: boolean };

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

function AnswerCard({ show }: Props) {
  const today = new Date();
  const todayMonth = (today.getMonth() + 1).toString().padStart(2, "0");
  const todayDate = today.getDate().toString().padStart(2, "0");

  // Tab 전환
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { name, nickname } = useUserStore();
  const { yourName, yourNickName } = useCoupleStore();

  return (
    <>
      <AnsCard>
        <CardContent>
          <p>
            {todayMonth}/{todayDate}
          </p>
          <p>[해당 날짜 질문]에 대해 어떻게 생각?</p>
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
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                상대방의 답변
              </CustomTabPanel>
            </Box>
          )}
        </CardContent>
        {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </AnsCard>
    </>
  );
}

export default AnswerCard;
