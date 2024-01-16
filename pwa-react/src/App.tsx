import React from "react";
import Global from "./styles/common/global";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import GroupDetail from './routes/GroupDetail'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Global />
        <Routes>
          <Route path="/group/:id" element={<GroupDetail />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
