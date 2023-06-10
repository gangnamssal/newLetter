import { useRef } from "react";

import Gnb from "../components/Gnb/Gnb";
import scrapGnbStore from "../modules/ScrapGnbStore";
import NewsCard from "../components/NewsCard/NewsCard";
import { Docs } from "../components/HomeScreen/HomeScreenType";
import EmptyScrapContent from "../components/ScrapScreen/EmptyScrapContent";

function ScrapScreen() {
  const localData = localStorage.getItem("scrap-data");
  const divRef = useRef<{ [ref: number]: HTMLDivElement }>({});
  const { store } = scrapGnbStore();

  return (
    <div>
      {localData && localData !== "[]" ? <Gnb store={store} /> : null}
      {localData && localData !== "[]" ? (
        JSON.parse(localData).map((news: Docs, index: number) => {
          return (
            <NewsCard
              key={news._id}
              data={news}
              divRef={divRef}
              index={index}
            />
          );
        })
      ) : (
        <EmptyScrapContent />
      )}
    </div>
  );
}

export default ScrapScreen;
