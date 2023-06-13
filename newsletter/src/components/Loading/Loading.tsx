/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const loadingStyle = css`
  width: 100%;
  height: 65vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 900;
`;

function Loading() {
  return <div css={loadingStyle}>Loading...</div>;
}

export default Loading;
