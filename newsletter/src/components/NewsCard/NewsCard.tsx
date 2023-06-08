/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { AiOutlineStar } from "@react-icons/all-files/ai/AiOutlineStar";
import { AiFillStar } from "@react-icons/all-files/ai/AiFillStar";

const newsCardStyle = css`
  width: 88%;
  height: 13.2vh;
  background-color: #fefefe;
  margin: 2% 0 0 6%;
  border-radius: 8px;
  letter-spacing: -0.1rem;
  line-height: 28px;
  position: relative;

  .star-icon {
    position: absolute;
    top: 13%;
    right: 5%;
    color: #6d6d6d;
  }

  .news-headline {
    margin: 0;
    padding: 3% 15% 2% 5%;
    font-weight: 600;
    font-size: 1.125rem;
  }

  .news-info {
    display: flex;
    justify-content: space-between;
    margin: 0 5%;
    p {
      margin: 0;
      font-size: 0.8125rem;
    }
    .reporter-info {
      display: flex;
      font-weight: 400;
      width: auto;
      white-space: nowrap;
      p:nth-of-type(1) {
        margin-right: 10%;
      }
    }

    .date-info {
      color: #6d6d6d;
    }
  }
`;

function NewsCard() {
  return (
    <div css={newsCardStyle}>
      <div className="star-icon">
        <AiOutlineStar size={25} />
      </div>

      <p className="news-headline">
        국방부 “北, 화성-17 실패 만회하려 영상 짜깁기… 성공 조작”
      </p>
      <div className="news-info">
        <div className="reporter-info">
          <p>조선일보</p>
          <p>김정확 기자</p>
        </div>

        <div className="date-info">
          <p>2021.3.15 (목)</p>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
