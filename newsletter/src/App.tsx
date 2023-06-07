import React from "react";
import { css, Global } from "@emotion/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Gnb from "./components/Gnb/Gnb";
import HomeScreen from "./routers/HomeScreen";
import TabBar from "./components/TabBar/TabBar";
import ScrapScreen from "./routers/ScrapScreen";

const globalStype = css`
  body {
    margin: 11vh 0 38vh 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f0f1f4;
    width: 100vw;
    height: 77vh;
    overflow-y: auto;
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
            <Route element={<TabBar />}>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/scrap" element={<ScrapScreen />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
