/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { Outlet } from "react-router-dom";
import gnbStore from "../modules/GnbStore";

const navStyle = css`
  width: 100vw;
  height: 13vh;
  background-color: white;
  display: flex;
  align-items: center;
  button {
    border: 1px solid #6d6d6d83;
    background-color: transparent;
    width: auto;
    height: 50%;
    border-radius: 50px;
    font-size: 0.875rem;
    color: #6d6d6d;
    font-weight: 400;
    padding: 0 3% 0 3%;
  }

  button:nth-of-type(1) {
    margin: 0 2% 0 5%;
  }
  button:nth-of-type(2) {
    margin: 0 2% 0 0%;
  }
`;

function Gnb() {
  const { headline, datetime, nation } = gnbStore();

  return (
    <>
      <nav css={navStyle}>
        <button>전체 헤드라인</button>
        <button>전체 날짜</button>
        <button>전체 국가</button>
      </nav>

      <Outlet />
    </>
  );
}

export default Gnb;
