/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const errorMessageStyle = css`
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .error-message {
    font-size: 1.3rem;
    font-weight: 400;

    @media (min-width: 1280px) {
      font-size: 1.2rem;
    }
  }

  .retry-button {
    border: 0;
    background-color: #3478f6;
    color: white;
    border-radius: 16px;
    width: 65%;
    height: 10%;
    font-size: 1rem;
    font-weight: 900;
    cursor: pointer;

    @media (min-width: 1280px) {
      width: 35%;
    }
  }
`;

function ErrorMessage({ reset }: any) {
  return (
    <div css={errorMessageStyle}>
      <p className="error-message">잠시후 다시 시도해주세요</p>
      <button className="retry-button" onClick={reset}>
        다시시도
      </button>
    </div>
  );
}

export default ErrorMessage;
