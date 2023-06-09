/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef, useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { GoSearch } from "@react-icons/all-files/go/GoSearch";
import { BiCalendarCheck } from "@react-icons/all-files/bi/BiCalendarCheck";

import GnbModal from "../Modal/GnbModal";
import scrapGnbStore from "../../modules/ScrapGnbStore";
import gnbStore, { Store } from "../../modules/GnbStore";
import Toast from "../Toast/Toast";
import toastStore from "../../modules/ToastStore";

// 버튼 스타일
const gnbStyle = css`
  width: 100vw;
  height: 10vh;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  background-color: white;
  z-index: 2;

  @media (min-width: 1280px) {
    width: 1280px;
    margin: 0 auto;
  }

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

    @media (min-width: 1280px) {
      width: 1024px;
      height: 47%;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;

function Gnb({ store }: { store: Store }) {
  const { toast, toastState } = toastStore();
  const { setStore } = gnbStore();
  const { setScrapStore } = scrapGnbStore();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const pathName = useLocation().pathname;

  // prop 시켜줄 setStore 함수를 결정
  const propSetStore = () => {
    switch (pathName) {
      case "/":
        return setStore;
      default:
        return setScrapStore;
    }
  };

  // 버튼 리스트
  const buttons = [
    {
      title: store.headline
        ? `${
            store.headline.length > 7
              ? `${store.headline.slice(0, 7)}...`
              : store.headline
          }`
        : "전체 헤드라인",
      icons: GoSearch,
    },
    {
      title: store.datetime ? store.datetime : "전체 날짜",
      icons: BiCalendarCheck,
    },
    {
      title: store.nations.length
        ? store.nations.length > 1
          ? `${store.nations[0]} 외 ${store.nations.length - 1}개`
          : `${store.nations[0]}`
        : "전체 국가",
      icons: null,
    },
  ];

  return (
    <>
      <nav css={gnbStyle}>
        {/* 토스트 */}
        <Toast toast={toast} toastState={toastState} />

        {/* 모달 버튼 */}
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
            <GnbModal dialogRef={dialogRef} setStore={propSetStore()} />
          </dialog>
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default Gnb;
