import React from "react";
import Global from "./styles/common/global";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import GroupDetail from './routes/GroupDetail'
import Login from "./routes/Login";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Global />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/group/:id" element={<GroupDetail />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
