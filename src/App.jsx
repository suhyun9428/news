import { Routes, Route } from "react-router-dom";
import { useAtom } from "jotai";
import { isDarkModeAtom, isLoggedInAtom, mischiefPopupAtom } from "./atom/atom";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Layout from "./components/Layout/Layout";
import MainPage from "./components/Section/MainPage";
import SignUpSection from "./components/Section/SignUpSection";
import LoginSection from "./components/Section/LoginSection";
import ShowInterested from "./components/Contents/ShowInterested";
import Issue from "./components/Contents/Issue";
import MenuBar from "./components/Header/MenuBar";
import dummyData from "./dummyData/dummyData";
import DetailContent from "./components/Contents/DetailContent";
import MischiefPopup from "./components/Popup/MischiefPopup";

function App() {
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [isDarkMode, ] = useAtom(isDarkModeAtom);
  const [isOpen, ] = useAtom(mischiefPopupAtom);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("로그인 되어 있음", user);
        setIsLoggedIn(true);
      } else {
        // console.log("로그아웃 상태");
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, [setIsLoggedIn]);

  useEffect(() => {
    document.documentElement.dataset.theme = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  return (
    <>
      {isOpen && <MischiefPopup />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="signup" element={<SignUpSection />} />
          <Route path="login" element={<LoginSection />} />
          <Route path="interest" element={<ShowInterested />} />
          <Route path="issue" element={<Issue />} />
          <Route path="menubar" element={<MenuBar data={dummyData.MenuBar} />}/>
          <Route path="detail" element={<DetailContent />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
