import React from "react";
import Global from "./styles/common/global";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useUserStore from "./stores/UserStore";

import Login from "./routes/Login";
import Main from "./routes/Main";
import SignUp from "./routes/SignUp";
import Invite from "./routes/Invite";
import Invited from "./routes/Invited";
import ModeSelect from "./routes/ModeSelect";
import CameraCouple from "./routes/CameraCouple";
import CameraSolo from "./routes/CameraSolo";
import MiddleLogin from "./routes/MiddleLogin";
import useAuthStore from "./stores/AuthStore";
import Calendar from "./routes/Calendar";

function App() {
  const { isLogIn } = useAuthStore();
  const { coupleId } = useUserStore();

  return (
    <BrowserRouter>
      <div>
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
          <Route
            path="/invited/:user_id/:user_name"
            element={<Invited />}
          ></Route>
          <Route path="/camera" element={<ModeSelect />}></Route>
          <Route path="/middle/login" element={<MiddleLogin />}></Route>
          <Route path="/camera/solo" element={<CameraSolo />}></Route>
          <Route path="/camera/couple" element={<CameraCouple />}></Route>
          <Route path="/calendar" element={<Calendar />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
