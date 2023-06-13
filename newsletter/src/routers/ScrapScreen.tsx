import { useRef } from "react";

import Gnb from "../components/Gnb/Gnb";
import scrapStore from "../modules/ScrapStore";
import scrapGnbStore from "../modules/ScrapGnbStore";
import NewsCard from "../components/NewsCard/NewsCard";
import { Docs, Keywords } from "../components/HomeScreen/HomeScreenType";
import EmptyScrapContent from "../components/ScrapScreen/EmptyScrapContent";
import { changeNationName } from "../components/HomeScreen/HomeScreenFetcher";

// 같은 요일 데이터만 필터링
const isSameDate = (date: string, value: string) => {
  return date.includes(value.replaceAll(".", "-"));
};

// 헤드라인에 포함되어있나 확인하는 함수
const isIncludeHeadline = (headline: string, value: string) => {
  return headline.toLowerCase().includes(value.toLowerCase());
};

// 국가가 포함되어 있는지 확인하는 함수
const isIncludeNation = (keyword: Keywords[], nations: string[]) => {
  if (!nations.length) return true;

  for (const key of keyword) {
    if (key?.name === "glocations") {
      for (const nation of nations) {
        console.log(changeNationName[nation], key.value);
        if (changeNationName[nation] === key.value) return true;
      }
    }
  }

  return false;
};

const isFilteredData = (
  data: Docs,
  datetime: string,
  headline: string,
  nations: string[]
) => {
  if (!datetime && !headline && !nations.length) return true;

  if (!isSameDate(data.pub_date, datetime)) return false;
  else {
    if (!headline && !nations.length) return true;
    else {
      if (
        isIncludeHeadline(data.headline.main, headline) &&
        isIncludeNation(data.keywords, nations)
      )
        return true;
      return false;
    }
  }
};

function ScrapScreen() {
  const { store } = scrapGnbStore();
  const { datetime, headline, nations } = store;
  const { store: scrapstore } = scrapStore();
  const localData = localStorage.getItem("scrap-data");
  const divRef = useRef<{ [ref: number]: HTMLDivElement }>({});

  return (
    <div>
      {localData && localData !== "[]" ? <Gnb store={store} /> : null}
      {localData && localData !== "[]" ? (
        JSON.parse(localData).map((news: Docs, index: number) => {
          return isFilteredData(news, datetime, headline, nations) ? (
            <NewsCard
              key={news._id}
              data={news}
              divRef={divRef}
              index={index}
            />
          ) : null;
        })
      ) : (
        <EmptyScrapContent />
      )}
    </div>
  );
}

export default ScrapScreen;
