import React from "react";
import Global from "./styles/common/global";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./routes/Login";
import Main from "./routes/Main";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Global />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Main />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
