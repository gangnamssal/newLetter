import { Suspense } from "react";

import Loading from "../components/Loading/Loading";
import ErrorMessage from "../components/ErrorBoundary/ErrorMessage";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import HomeScreenFetcer from "../components/HomeScreen/HomeScreenFetcher";
import HomeScreenListContainer from "../components/HomeScreen/HomeScreenListContainer";

function HomeScreen() {
  return (
    <>
      <ErrorBoundary fallback={ErrorMessage}>
        <Suspense fallback={<Loading />}>
          <HomeScreenFetcer>
            <HomeScreenListContainer />
          </HomeScreenFetcer>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default HomeScreen;
