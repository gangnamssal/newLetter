/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const toastStyle = (toast: boolean, toastState: string) => css`
  width: 40%;
  height: 50%;
  position: absolute;
  background-color: #e4e4e4;
  border-radius: 16px;
  z-index: 2;
  margin-left: 30%;
  animation-name: show;
  animation-duration: 0.3s;
  display: ${toast ? "block" : "none"};

  @keyframes show {
    from {
      transform: translate(0, -100px);
      opacity: 0;
    }
    to {
      transform: translate(0, 0);
      opacity: 1;
    }
  }

  .scrap-word {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-weight: 600;
    color: ${toastState === "scrap" ? "#06b300" : "#ff0000"};
    font-size: 1.1rem;
  }
`;

function Toast({ toast, toastState }: { toast: boolean; toastState: string }) {
  return (
    <div css={toastStyle(toast, toastState)}>
      <p className="scrap-word">
        {toastState === "scrap" ? "Scrap" : "Delete"}
      </p>
    </div>
  );
}
export default Toast;
