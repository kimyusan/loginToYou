import React from "react";
import Global from "./styles/common/global";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./routes/Login";
import Main from "./routes/Main";
import SignUp from "./routes/SignUp";
import Invite from "./routes/Invite";
import Camera from "./routes/Camera"
import MiddleLogin from './routes/MiddleLogin'
import useAuthStore from "./stores/AuthStore";

function App() {
  const { isLogIn } = useAuthStore();

  return (
    <BrowserRouter>
      <div>
        <Global />
        <Routes>
          <Route path="/" element={isLogIn ? <Main /> : <Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/main" element={<Main />} />
          <Route path="/invite" element={<Invite />}></Route>
          <Route path="/camera" element={<Camera />}></Route>
          <Route path="/middle/login" element={<MiddleLogin />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
