import { useRef, useEffect } from "react";

import { Props } from "./HomeScreenType";
import NewsCard from "../NewsCard/NewsCard";

// intersaction 옵션
const intersectionOptions = {
  rootMargin: "0px",
  threshold: 0.5,
};

function HomeScreenListContainer({
  data,
  hasNextPage,
  fetchNextPage,
}: Partial<Props>) {
  const divRef = useRef<{ [ref: number]: HTMLDivElement }>({});

  // 생성된 객체 중 마지막 객체가 인식되면 다시 query를 호출한다.
  const intersection = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        if (hasNextPage && fetchNextPage) {
          fetchNextPage();
        }
      }
    });
  }, intersectionOptions);

  useEffect(() => {
    if (divRef?.current && data?.pages?.length) {
      const lastIndex = data?.pages?.length - 1;
      intersection.observe(divRef?.current[lastIndex]);
    }
  }, [data]);

  return (
    <>
      {data?.pages.map((news, index) => {
        return (
          <div
            key={`${news._id}+${news.abstract}+${news.headline}+${news.pub_date}`}
          >
            <NewsCard data={news} divRef={divRef} index={index} />
          </div>
        );
      })}
    </>
  );
}

export default HomeScreenListContainer;
