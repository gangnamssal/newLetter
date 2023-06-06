import React from "react";
import { css, Global } from "@emotion/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Gnb from "./components/Gnb";
import HomeScreen from "./routers/HomeScreen";

const globalStype = css`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f0f1f4;
    width: 100vw;
    height: 90vh;
  }
`;

function App() {
  return (
    <>
      <Global styles={globalStype} />
      <Router>
        <Routes>
          {/* 전역 네비게이션 바 */}
          <Route element={<Gnb />}>
            <Route path="/" element={<HomeScreen />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
