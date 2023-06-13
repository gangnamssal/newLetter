/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { IoMdListBox } from "@react-icons/all-files/io/IoMdListBox";
import { useNavigate } from "react-router-dom";

const emptyScrapContentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 90%;

  @media (min-width: 1280px) {
    margin-top: 35%;
  }

  .empty-scrap-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #6d6d6d;
    font-weight: 600;
    p {
      margin-top: 4%;
      margin-bottom: 15%;
    }
  }

  .empty-scrap-button {
    border: 0;
    background-color: #3478f6;
    color: white;
    width: 70%;
    height: 7vh;
    border-radius: 16px;
    font-weight: 600;
    @media (min-width: 1280px) {
      width: 30%;
    }
  }
`;

function EmptyScrapContent() {
  const navigate = useNavigate();

  return (
    <div css={emptyScrapContentStyle}>
      <div className="empty-scrap-content">
        <IoMdListBox size={40} />
        <p>저장된 스크랩이 없습니다.</p>
      </div>
      <button className="empty-scrap-button" onClick={() => navigate("/")}>
        스크랩 하러 가기
      </button>
    </div>
  );
}

export default EmptyScrapContent;
