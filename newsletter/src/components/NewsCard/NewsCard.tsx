/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { AiFillStar } from "@react-icons/all-files/ai/AiFillStar";
import { AiOutlineStar } from "@react-icons/all-files/ai/AiOutlineStar";

import { Props } from "./NewsCardType";
import { Docs } from "../HomeScreen/HomeScreenType";
import { getDayOfWeek } from "../../customs/getDayOfWeek";
import { L, go, takeAll } from "../../customs/FunctionalJS";

const newsCardStyle = css`
  width: 88%;
  height: 13.2vh;
  background-color: #fefefe;
  margin: 2% 0 0 6%;
  border-radius: 8px;
  letter-spacing: -0.1rem;
  line-height: 28px;
  position: relative;

  @media (min-width: 1280px) {
    height: auto;
  }

  .star-icon {
    position: absolute;
    top: 11%;
    right: 5%;
    color: #6d6d6d;

    @media (min-width: 1280px) {
      top: 20%;
    }
  }

  .news-headline {
    margin: 0;
    margin-bottom: 2%;
    padding: 2% 15% 1% 5%;
    font-weight: 600;
    font-size: 1.125rem;
    height: 55%;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
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
      letter-spacing: -0.03rem;

      p:nth-of-type(1) {
        margin-right: 2%;
      }
    }

    .date-info {
      color: #6d6d6d;
    }
  }
`;

// localstorage의 item을 가져오는 함수
const getStorageItem = (key: string) => {
  return JSON.parse(localStorage.getItem(key) as string);
};

const test = () => {};

function NewsCard({ data, divRef, index }: Props) {
  const [isScrap, setIsScrap] = useState<boolean>(false);

  // 기사 클릭 시 URL 이동 함수
  const goToUrl = () => window.open(`${data.web_url}`);

  // 스크랩 온 / 오프 함수
  const onScrap = (data: Docs, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    let updateLocalData;
    const storedObject = getStorageItem("scrap-data");

    switch (isScrap) {
      case true:
        updateLocalData = go(
          storedObject,
          L.filter((d: Docs) => d._id !== data._id),
          takeAll
        );
        break;
      default:
        localStorage.getItem("scrap-data")
          ? (updateLocalData = [data, ...storedObject])
          : (updateLocalData = [data]);
        break;
    }
    localStorage.removeItem("scrap-data");
    localStorage.setItem("scrap-data", JSON.stringify(updateLocalData));
    setIsScrap((isScrap) => !isScrap);
  };

  useEffect(() => {
    if (getStorageItem("scrap-data")) {
      for (const item of getStorageItem("scrap-data")) {
        if (item._id === data._id) {
          setIsScrap((isScrap) => !isScrap);
          break;
        }
      }
    }
  }, []);

  return (
    <article>
      <div
        css={newsCardStyle}
        ref={(ref) => {
          if (ref) {
            divRef.current[index] = ref;
          }
        }}
        onClick={goToUrl}
      >
        <div
          className="star-icon"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => onScrap(data, e)}
        >
          {isScrap ? (
            <AiFillStar size={25} css={{ color: "#FFB800" }} />
          ) : (
            <AiOutlineStar size={25} />
          )}
        </div>

        {/* 헤드라인 */}
        <p className="news-headline">{data?.headline.main}</p>

        <div className="news-info">
          <div className="reporter-info">
            {/* 뉴스 데스크 */}
            <p>{data?.news_desk ? data?.news_desk : null}</p>

            {/* 리포터 */}
            <p>
              {data?.byline.person.length
                ? `By ${data?.byline.person[0].firstname} ${
                    data?.byline.person[0].lastname
                  } ${data?.byline.person.length > 1 ? "et al." : ""}`
                : null}
            </p>
          </div>

          <div className="date-info">
            {/* 날짜 */}
            <p>{`${data?.pub_date
              .split("T")[0]
              .replaceAll("-", ". ")} (${getDayOfWeek(
              data?.pub_date.split("T")[0]
            )})`}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default NewsCard;
