## 23.06.06

---

### 1. 프로젝트 셋팅

1. react, typescript 설치

   ```bash
   npx create-react-app my-app --template typescript
   ```

2. 라이브러리 설치

   ```bash
   // router
   npm i react-router-dom@6
   
   // zustand
   npm i zustand
   
   // react-query
   npm i @tanstack/react-query
   
   // emotion
   npm i @emotion/react
   ```

3. 초기 폴더 구조

   ![image-20230606231046771](C:./캡쳐이미지/초기셋팅.png)

4. 초기 파일 상태

   - index.tsx

     ```typescript
     import React from "react";
     import ReactDOM from "react-dom/client";
     import App from "./App";
     import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
     
     const queryClient = new QueryClient({
       defaultOptions: {
         queries: {
           retry: false,
           suspense: true,
           useErrorBoundary: true,
           refetchOnWindowFocus: false,
           keepPreviousData: true,
         },
       },
     });
     
     const root = ReactDOM.createRoot(
       document.getElementById("root") as HTMLElement
     );
     root.render(
       // <React.StrictMode>
       <QueryClientProvider client={queryClient}>
         <App />
       </QueryClientProvider>
       // </React.StrictMode>
     );
     
     ```

   - App.tsx

     ```typescript
     import React from "react";
     import { css, Global } from "@emotion/react";
     import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
     
     import Gnb from "./components/Gnb";
     import HomeScreen from "./routers/HomeScreen";
     
     const globalStype = css`
       body {
         margin: 0;
         padding: 0;
         box-sizing: border-box;
       }
     `;
     
     function App() {
       return (
         <>
           <Global styles={globalStype} />
           <Router>
             <Routes>
               {/* 전역 네비게이션 바 */}
               <Route element={<Gnb />}>
                 <Route path="/" element={<HomeScreen />}></Route>
               </Route>
             </Routes>
           </Router>
         </>
       );
     }
     
     export default App;
     
     ```


### 3. 에러 해결

- Emotion "you have tried to stringify object returned from css function" 에러 해결

  ```typescript
  // 아래 코드를 추가해주면 된다.
  /** @jsxImportSource @emotion/react */
  
  // 사용 예시
  /** @jsxImportSource @emotion/react */
  import { css } from "@emotion/react";
  ```

- React-icons 청크 사이즈 줄이기

  - `react-icons`는 icon 종류별로 구분되어 있으며, 종류별로 하나의 js 파일에 아이콘 전체를 포함하고 있다.
  - `@react-icons/all-files` 라이브러리는 아이콘 별로 js 파일을 가지고 있다. 따라서 빌드 시 트리 쉐이킹 방식으로 인해 더 적은 크기의 chunk를 만들게 됩니다.
  - 출처
    - https://eratosthenes.tistory.com/2

  ```bash
  npm i @react-icons/all-files
  ```

  

