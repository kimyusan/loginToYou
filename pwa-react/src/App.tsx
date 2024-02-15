import React, { useEffect } from "react";
import Global from "./styles/common/global";
// import '../public/firebase-messaging-sw.ts'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useUserStore from "./stores/UserStore";
import useAuthStore from "./stores/AuthStore";
import { ThemeProvider } from "styled-components";

import Login from "./routes/Login";
import Main from "./routes/Main";
import SignUp from "./routes/SignUp";
import Invite from "./routes/Invite";
import Invited from "./routes/Invited";
import CameraCouple from "./routes/CameraCouple";
import CameraSolo from "./routes/CameraSolo";
import MiddleLogin from "./routes/MiddleLogin";
import Calendar from "./routes/Calendar";
import UserInfo from "./routes/UserInfo";
import CoupleInfo from "./routes/CoupleInfo";
import Chat from "./routes/Chat";
import Diary from "./routes/Diary";
import Question from "./routes/Question";
import ChatVideo from "./routes/ChatVideo";
import Settings from "./routes/Settings";
import Theme from "./components/Settings/Theme";
import ChangePw from "./components/Settings/ChangePw";
import DeleteAccount from "./components/Settings/DeleteAccount";
import SettingPush from "./components/Settings/SettingPush";
import BalanceGame from "./routes/BalanceGame";
import Challenge from "./routes/Challenge";
import DiaryDetail from "./routes/DiaryDetail";

// import Notification from "./components/Notification";

// import Notification from "./components/Notification";

function App() {
  const { isLogIn } = useAuthStore();
  const { coupleId } = useUserStore();

  const theme = useAuthStore.getState().colortheme;

  return (
    <BrowserRouter>
      <div>
        <ThemeProvider theme={theme}>
          {/* <Notification /> */}
          <Global />
          <Routes>
            <Route
              path="/"
              element={
                isLogIn ? (
                  coupleId ? (
                    <Navigate replace to="/main" />
                  ) : (
                    <Navigate replace to="/invite" />
                  )
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/main" element={<Main />} />
            <Route path="/invite" element={<Invite />}></Route>
            <Route path="/invited/:user_email" element={<Invited />}></Route>
            <Route path="/middle/login" element={<MiddleLogin />}></Route>
            <Route path="/camera/solo" element={<CameraSolo />}></Route>
            <Route path="/camera/couple" element={<CameraCouple />}></Route>
            <Route path="/calendar" element={<Calendar />}></Route>
            <Route path="/user_info/:user_id" element={<UserInfo />}></Route>
            <Route
              path="/couple_info/:couple_id"
              element={<CoupleInfo />}
            ></Route>
            <Route path="/chat/:room_id" element={<Chat />}></Route>
            <Route path="/diary" element={<Diary />}></Route>
            <Route
              path="/diarydetail/:diaryId"
              element={<DiaryDetail />}
            ></Route>
            <Route path="/question" element={<Question />}></Route>
            <Route path="/chat/video" element={<ChatVideo />}></Route>
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/theme" element={<Theme />} />
            <Route path="/settings/password" element={<ChangePw />} />
            <Route path="/settings/quit" element={<DeleteAccount />} />

            <Route path="/settings/push" element={<SettingPush />} />

            <Route path="/balancegame" element={<BalanceGame />} />
            <Route path="/challenge" element={<Challenge />} />
          </Routes>
        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
