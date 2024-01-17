import React from "react";
import Global from "./styles/common/global";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./routes/Login";
import Main from "./routes/Main";
import SignUp from "./routes/SignUp";
import useAuthStore from "./stores/AuthStore";

function App() {
  const { isLogIn } = useAuthStore();

  return (
    <BrowserRouter>
      <div>
        <Global />
        <Routes>
          <Route path="/" element={ isLogIn ? <Main /> : <Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/main" element={<Main />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
