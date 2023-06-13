import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

export interface Children {
  children: React.PropsWithChildren<ReactJSXElement>;
}

export interface ChangeNationName {
  [key: string]: string;
  대한민국: string;
  중국: string;
  일본: string;
  미국: string;
  북한: string;
  러시아: string;
  프랑스: string;
  영국: string;
}

interface Headline {
  content_kicker: null | string;
  kicker: null | string;
  main: string;
  name: null | string;
  print_headline: null | string;
  seo: null | string;
  sub: null | string;
}

interface Person {
  firstname: string;
  lastname: string;
  middlename: null | string;
  organization: string;
  qualifier: null | string;
  rank: number;
  role: string;
  title: null | string;
}

interface Byline {
  organization: null | string;
  original: string;
  person: Person[];
}

export interface Keywords {
  major: string;
  name: string;
  rank: number;
  value: string;
}

export interface Docs {
  abstract: string;
  byline: Byline;
  document_type: string;
  headline: Headline;
  keywords: Keywords[];
  lead_paragraph: string;
  multimedia: object;
  news_desk: string;
  pub_date: string;
  section_name: string;
  snippet: string;
  source: string;
  type_of_material: string;
  uri: string;
  web_url: string;
  word_count: number;
  _id: string;
}

interface Meta {
  hits: number;
  offset: number;
  time: number;
}

interface Data {
  copyright: string;
  response: {
    docs: Docs[];
    meta: Meta;
  };
  status: string;
}

export interface Lmap {
  config: object;
  data: Data;
  headers: object;
  request: object;
}

interface Data {
  pageParams?: number[];
  pages: Docs[];
}

export interface Props {
  data: Data;
  hasNextPage: boolean;
  fetchNextPage: UseInfiniteQueryResult["fetchNextPage"];
}
