/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { HiHome } from "@react-icons/all-files/hi/HiHome";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { IoMdListBox } from "@react-icons/all-files/io/IoMdListBox";

const footerStyle = (pathname: string) => css`
  width: 100%;
  height: 11vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  bottom: 0;
  border-radius: 30px;
  background-color: black;
  position: fixed;
  color: white;

  @media (min-width: 1280px) {
    width: 1280px;
    margin: 0 auto;
  }

  .home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${pathname === "/" ? "white" : "#6D6D6D"};
    cursor: pointer;
    p {
      margin: 20% 0 0 0;
      font-size: 0.7rem;
      color: ${pathname === "/" ? "white" : "#6D6D6D"};
    }
  }

  .scrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${pathname === "/" ? "#6D6D6D" : "white"};
    cursor: pointer;
    p {
      margin: 20% 0 0 0;
      font-size: 0.7rem;
      color: ${pathname === "/" ? "#6D6D6D" : "white"};
    }
  }
`;

function TabBar() {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  return (
    <>
      <Outlet />
      <footer css={footerStyle(pathname)}>
        {/* 홈 */}
        <div className="home" onClick={() => navigate("/")}>
          <HiHome size={27} />
          <p>홈</p>
        </div>

        {/* 스크랩 */}
        <div className="scrap" onClick={() => navigate("/scrap")}>
          <IoMdListBox size={27} />
          <p>스크랩</p>
        </div>
      </footer>
    </>
  );
}

export default TabBar;
