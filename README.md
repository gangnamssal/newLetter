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

     

   
