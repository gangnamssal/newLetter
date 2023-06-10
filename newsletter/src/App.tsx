import { css, Global } from "@emotion/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Gnb from "./components/Gnb/Gnb";
import gnbStore from "./modules/GnbStore";
import HomeScreen from "./routers/HomeScreen";
import TabBar from "./components/TabBar/TabBar";
import ScrapScreen from "./routers/ScrapScreen";

const globalStype = css`
  body {
    width: 100vw;
    height: auto;
    margin: 13vh 0 13vh 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f0f1f4;
  }
`;

function App() {
  const { store } = gnbStore();

  return (
    <>
      <Global styles={globalStype} />
      <Router>
        <Routes>
          {/* 전역 네비게이션 바 */}
          <Route element={<Gnb store={store} />}>
            <Route element={<TabBar />}>
              <Route path="/" element={<HomeScreen />} />
            </Route>
          </Route>

          <Route element={<TabBar />}>
            <Route path="/scrap" element={<ScrapScreen />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
