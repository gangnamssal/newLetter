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
   
   // axios
   npm i axios
   
   // datepicker
   npm install @mui/x-date-pickers dayjs @mui/material
   ```

3. 초기 폴더 구조

   ![초기셋팅](./캡쳐이미지/초기셋팅.png)

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


### 2. 에러 해결

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




## 23.06.07

---

### 1. 구현 내용

- gnb 버튼에 modal 나타내기 구현

- mui datepicker 적용

  

### 2. 에러 해결

- Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'NationObject'.  No index signature with a parameter of type 'string' was found on type 'NationObject'.
  - **원인**
    - TypeScript는 기본적으로 객체의 프로퍼티를 읽을 때, `string`타입의 key 사용을 허용하지 않는다. 아래의 코드에서 에러가 발생한 이유는 `string literal`타입만 허용되는 곳에 string 타입을 사용했기 때문이다.
  - **참고 블로그** 
    - https://velog.io/@raccoon-ccoder/Error-TypeScript-Element-implicitly-has-an-any-type-because-expression-of-type-string-cant-be-used-to-index

```typescript
// 수정 전
type Nation =
  | "대한민국"
  | "중국"
  | "일본"
  | "미국"
  | "북한"
  | "러시아"
  | "프랑스"
  | "영국";

export type NationObject = Record<Nation, boolean>;


// 수정 후
export type NationObject = {
  [key: string]: boolean;
  대한민국: boolean;
  중국: boolean;
  일본: boolean;
  미국: boolean;
  북한: boolean;
  러시아: boolean;
  프랑스: boolean;
  영국: boolean;
};

```

