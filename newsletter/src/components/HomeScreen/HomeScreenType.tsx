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

interface Docs {
  abstract: string;
  byline: object;
  document_type: string;
  headline: object;
  keywords: object[];
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

export interface Props {
  data: object;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}
