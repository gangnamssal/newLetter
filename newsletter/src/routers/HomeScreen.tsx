import { Suspense } from "react";

import Loading from "../components/Loading/Loading";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import ErrorMessage from "../components/ErrorBoundary/ErrorMessage";
import HomeScreenFetcer from "../components/HomeScreen/HomeScreenFetcher";
import HomeScreenListContainer from "../components/HomeScreen/HomeScreenListContainer";

function HomeScreen() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <>
      <ErrorBoundary
        fallbackRender={({ resetErrorBoundary }) => (
          <ErrorMessage reset={resetErrorBoundary} />
        )}
        onReset={reset}
      >
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
