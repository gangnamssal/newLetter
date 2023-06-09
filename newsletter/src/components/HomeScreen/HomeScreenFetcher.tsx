import axios from "axios";
import { cloneElement } from "react";
import { Children } from "./HomeScreenType";
import { useInfiniteQuery } from "@tanstack/react-query";

import gnbStore, { Store } from "../../modules/GnbStore";

const HomeScreenAPI = (
  pageParam: number,
  { headline, datetime, nation }: Store
) => {
  const KEY = process.env.REACT_APP_API_KEY;

  return axios({
    method: "get",
    url: `https://api.nytimes.com/svc/search/v2/articlesearch.json`,
    params: {
      begin_date: datetime,
      end_date: datetime,
      fq: "",
      "api-key": KEY,
      page: pageParam,
    },
  });
};

const HomeScreenQueryOptions = {
  getNextPageParam: (lastPage: any, allPages: any[]) => {
    console.log(lastPage, allPages);
    return;
  },
  cacheTime: 1000 * 300,
  staleTime: 1000 * 300,
};

function HomeScreenFetcer({ children }: Children) {
  const { store: filterData } = gnbStore();

  const { data } = useInfiniteQuery(
    ["home-screen-api"],
    ({ pageParam = 1 }) => HomeScreenAPI(pageParam, filterData),
    HomeScreenQueryOptions
  );

  return cloneElement(children);
}

export default HomeScreenFetcer;
