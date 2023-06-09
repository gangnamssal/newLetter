import axios from "axios";
import { cloneElement } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ChangeNationName, Children, Lmap } from "./HomeScreenType";

import { L, go, takeAll } from "../../customs/FunctionalJS";
import { getNowDate } from "../../customs/getNowDate";
import gnbStore, { Store } from "../../modules/GnbStore";

// 영문 이름을 담은 객체
const changeNationName: ChangeNationName = {
  대한민국: "Korea",
  중국: "China",
  일본: "Japan",
  미국: "United States",
  북한: "North Korea",
  러시아: "Russia",
  프랑스: "France",
  영국: "United Kingdom",
};

// params의 필터 날짜를 설정하는 함수
const setDateTime = (datetime: string) => {
  if (datetime) {
    return {
      begin_date: datetime.replaceAll(".", ""),
      end_date: getNowDate(""),
    };
  }
  return {};
};

// params의 헤드라인을 설정하는 함수
const setHeadline = (headline: string) => {
  let hl = "";
  if (headline) {
    hl += `headline:(${headline})`;
    return hl;
  }
};

// params의 국가를 설정하는 함수
const setNations = (nations: string[]) => {
  let glocations = "";

  if (nations.length) {
    for (const nation of nations) {
      if (!glocations) {
        glocations += `glocations:(${changeNationName[nation]})`;
      } else {
        glocations += ` OR glocations:(${changeNationName[nation]})`;
      }
    }
    return glocations;
  }
};

// 헤드라인과 국가를 설정하는 함수
const setHeadlineAndNations = (headline: string, nations: string[]) => {
  const headlineResult = setHeadline(headline);
  const nationsResult = setNations(nations);

  if (headlineResult && nationsResult)
    return { fq: `${headlineResult} OR (${nationsResult})` };
  else if (headlineResult && !nationsResult) return { fq: `${headlineResult}` };
  else if (!headlineResult && nationsResult) return { fq: `${nationsResult}` };
  else return {};
};

// API 호출 함수
const HomeScreenAPI = (
  pageParam: number,
  { datetime, headline, nations }: Store
) => {
  const KEY = process.env.REACT_APP_API_KEY;

  return axios({
    method: "get",
    url: `https://api.nytimes.com/svc/search/v2/articlesearch.json`,
    params: {
      "api-key": KEY,
      page: pageParam,
      ...setDateTime(datetime),
      ...setHeadlineAndNations(headline, nations),
    },
  });
};

function HomeScreenFetcer({ children }: Children) {
  const { store: filterData } = gnbStore();

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ["home-screen-api", filterData],
    ({ pageParam = 0 }) => HomeScreenAPI(pageParam, filterData),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (allPages.length * 10 < allPages[0].data.response.meta.hits) {
          return allPages.length;
        }
      },
      select: (data) => {
        const newPages = go(
          data.pages,
          L.map((d: Lmap) => d.data.response.docs),
          takeAll
        );

        return {
          pages: newPages,
          pageParams: data.pageParams,
        };
      },
      cacheTime: 1000 * 300,
      staleTime: 1000 * 300,
      refetchOnWindowFocus: true,
    }
  );

  return cloneElement(children, { data, hasNextPage, fetchNextPage });
}

export default HomeScreenFetcer;
