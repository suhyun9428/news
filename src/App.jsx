import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import MainPage from "./components/Section/MainPage";
import SignUpSection from "./components/Section/SignUpSection";
import LoginSection from "./components/Section/LoginSection";
import ShowInterested from "./components/Contents/ShowInterested";
import Issue from "./components/Contents/Issue";
import MenuBar from "./components/Header/MenuBar";
import dummyData from "./dummyData/dummyData";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "./atom/atom";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [isLoggedin, setIsLoggedIn] = useAtom(isLoggedInAtom);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("로그인 되어 있음", user);
        setIsLoggedIn(true);
      } else {
        console.log("로그아웃 상태");
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, [setIsLoggedIn]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="signup" element={<SignUpSection />} />
        <Route path="login" element={<LoginSection />} />
        <Route path="interest" element={<ShowInterested />} />
        <Route path="issue" element={<Issue />} />
        <Route path="menubar" element={<MenuBar data={dummyData.MenuBar} />} />
      </Route>
    </Routes>
  );
}

export default App;
