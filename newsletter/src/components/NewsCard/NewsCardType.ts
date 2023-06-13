import { Docs } from "../HomeScreen/HomeScreenType";

export interface Props {
  data: Docs;
  divRef: React.MutableRefObject<{
    [ref: string]: HTMLDivElement;
  }>;
  index: number;
}
