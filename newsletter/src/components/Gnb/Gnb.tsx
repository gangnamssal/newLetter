/** @jsxImportSource @emotion/react */
import { useRef } from "react";
import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";
import { GoSearch } from "@react-icons/all-files/go/GoSearch";
import { BiCalendarCheck } from "@react-icons/all-files/bi/BiCalendarCheck";

import gnbStore from "../../modules/GnbStore";
import GnbModal from "../Modal/GnbModal";

// 버튼 스타일
const gnbStyle = css`
  width: 100vw;
  height: 10vh;
  display: flex;
  align-items: center;
  background-color: white;

  .gnb-button {
    width: auto;
    height: 45%;
    display: flex;
    align-items: center;
    font-weight: 400;
    color: #6d6d6d;
    font-size: 0.75rem;
    border-radius: 50px;
    padding: 0 3% 0 3%;
    border: 1px solid #6d6d6d83;
    background-color: transparent;
    cursor: pointer;
  }

  .gnb-button:nth-of-type(1) {
    margin: 0 2% 0 5%;
  }
  .gnb-button:nth-of-type(2) {
    margin: 0 2% 0 0%;
  }

  .dialog::backdrop {
    background-color: black;
    opacity: 0.5;
  }

  .dialog {
    border: none;
    width: 80%;
    height: 53%;
    border-radius: 16px;
  }
`;

function Gnb() {
  const { store } = gnbStore();
  const dialogRef = useRef<HTMLDialogElement>(null);

  // 버튼 리스트
  const buttons = [
    {
      title: store.headline ? store.headline : "전체 헤드라인",
      icons: GoSearch,
    },
    {
      title: store.datetime ? store.datetime : "전체 날짜",
      icons: BiCalendarCheck,
    },
    {
      title: store.nation.length
        ? store.nation.length > 1
          ? `${store.nation[0]} 외 ${store.nation.length - 1}개`
          : `${store.nation[0]}`
        : "전체 국가",
      icons: null,
    },
  ];

  return (
    <>
      <nav css={gnbStyle}>
        {/* 버튼 */}
        {buttons.map((button) => {
          return (
            <button
              className="gnb-button"
              key={`${button.title} - ${button.icons}`}
              onClick={() => dialogRef.current?.showModal()}
            >
              {button.icons ? <button.icons size={17} /> : null}
              <div>{button.title}</div>
            </button>
          );
        })}

        {/* 모달 */}
        <div onClick={() => dialogRef.current?.close()}>
          <dialog className="dialog" ref={dialogRef}>
            <GnbModal dialogRef={dialogRef} />
          </dialog>
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default Gnb;
