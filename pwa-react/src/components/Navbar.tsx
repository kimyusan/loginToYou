import React, { useState } from "react";
import {
  NavBarbg,
  NavigationContainer,
  NavigationList,
} from "../styles/Nav/NavStyle";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/UserStore";
import useAuthStore from "../stores/AuthStore";
import { axiosAuth } from "../util/token";
import { useShallow } from "zustand/react/shallow";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import HomeIcon from "@mui/icons-material/Home";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import SwitchCameraIcon from "@mui/icons-material/SwitchCamera";
import EditNoteIcon from "@mui/icons-material/EditNote";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import QuizIcon from "@mui/icons-material/Quiz";
import BalanceIcon from "@mui/icons-material/Balance";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({ isOpen, setIsOpen }: Props) => {
  const navigate = useNavigate();
  const { userId, coupleId } = useUserStore(
    useShallow((state) => ({
      userId: state.userId,
      coupleId: state.coupleId,
    }))
  );

  // 채팅방 이동 시 roomId 조회
  const goChat = async () => {
    const res = await axiosAuth.get("/chat/enter", {
      params: { coupleId: coupleId },
    });
    console.log(res);
    navigate(`/chat/${res.data}`);
  };

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <NavigationContainer $isOpen={isOpen}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" className="list-subheader">
              전체 메뉴
            </ListSubheader>
          }
        >
          <ListItemButton
            onClick={() => navigate("/")}
            style={{ height: "6dvh" }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="홈으로" />
          </ListItemButton>

          <ListItemButton onClick={handleClick} style={{ height: "6dvh" }}>
            <ListItemIcon>
              <CameraAltIcon />
            </ListItemIcon>
            <ListItemText primary="사진 촬영" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate("/camera/solo")}
                style={{ height: "6dvh" }}
              >
                <ListItemIcon>
                  <PhotoCameraBackIcon />
                </ListItemIcon>
                <ListItemText primary="같이 찍기" />
              </ListItemButton>
            </List>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate("/camera/couple")}
                style={{ height: "6dvh" }}
              >
                <ListItemIcon>
                  <SwitchCameraIcon />
                </ListItemIcon>
                <ListItemText primary="따로 찍기" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton
            onClick={() => navigate("/diary")}
            style={{ height: "6dvh" }}
          >
            <ListItemIcon>
              <EditNoteIcon />
            </ListItemIcon>
            <ListItemText primary="다이어리" />
          </ListItemButton>

          <ListItemButton onClick={goChat} style={{ height: "6dvh" }}>
            <ListItemIcon>
              <MarkChatUnreadIcon />
            </ListItemIcon>
            <ListItemText primary="채팅" />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigate("/calendar")}
            style={{ height: "6dvh" }}
          >
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary="캘린더" />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigate("/question")}
            style={{ height: "6dvh" }}
          >
            <ListItemIcon>
              <QuizIcon />
            </ListItemIcon>
            <ListItemText primary="오늘의 질문" />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigate("/balancegame")}
            style={{ height: "6dvh" }}
          >
            <ListItemIcon>
              <BalanceIcon />
            </ListItemIcon>
            <ListItemText primary="밸런스 게임" />
          </ListItemButton>

          <ListItemButton style={{ height: "6dvh" }} onClick={() => navigate("/challenge")}>
            <ListItemIcon>
              <DirectionsRunIcon />
            </ListItemIcon>
            <ListItemText primary="챌린지" />
          </ListItemButton>
        </List>

        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" className="list-subheader">
              사용자 설정
            </ListSubheader>
          }
        >
          <ListItemButton
            onClick={() => navigate(`/user_info/${userId}`)}
            style={{ height: "6dvh" }}
          >
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText primary="회원 정보 수정" />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigate("/settings")}
            style={{ height: "6dvh" }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="앱 설정" />
          </ListItemButton>
        </List>
      </NavigationContainer>
      {isOpen ? (
        <NavBarbg
          onMouseDown={() => {
            setIsOpen(false);
          }}
        />
      ) : null}
    </>
  );
};

export default Navbar;
