import React from "react";
import Global from "./styles/common/global";

<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
=======
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useUserStore from "./stores/UserStore";
>>>>>>> 6bc7bc998d25daf24d2dbf789dba0b2efb4d6fff

import Login from "./routes/Login";
import Main from "./routes/Main";
import SignUp from "./routes/SignUp";
import Invite from "./routes/Invite";
<<<<<<< HEAD
import ModeSelect from "./routes/ModeSelect"
import CameraCouple from "./routes/CameraCouple"
import CameraSolo from "./routes/CameraSolo";
import MiddleLogin from './routes/MiddleLogin'
import useAuthStore from "./stores/AuthStore";

function App() {
  const { isLogIn } = useAuthStore();
=======
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
>>>>>>> 6bc7bc998d25daf24d2dbf789dba0b2efb4d6fff

  return (
    <BrowserRouter>
      <div>
        <Global />
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={isLogIn ? <Main /> : <Login />} />
=======
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
>>>>>>> 6bc7bc998d25daf24d2dbf789dba0b2efb4d6fff
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/main" element={<Main />} />
          <Route path="/invite" element={<Invite />}></Route>
<<<<<<< HEAD
=======
          <Route
            path="/invited/:user_id/:user_name"
            element={<Invited />}
          ></Route>
>>>>>>> 6bc7bc998d25daf24d2dbf789dba0b2efb4d6fff
          <Route path="/camera" element={<ModeSelect />}></Route>
          <Route path="/middle/login" element={<MiddleLogin />}></Route>
          <Route path="/camera/solo" element={<CameraSolo />}></Route>
          <Route path="/camera/couple" element={<CameraCouple />}></Route>
<<<<<<< HEAD
=======
          <Route path="/calendar" element={<Calendar />}></Route>
>>>>>>> 6bc7bc998d25daf24d2dbf789dba0b2efb4d6fff
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
