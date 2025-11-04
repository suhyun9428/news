import Header from "../Header/Header";
import NewsContent from "./NewsContent";
import TopButton from "./TopButton";
import MischiefPopup from "../Popup/MischiefPopup";
import MenuBar from "../Header/MenuBar";
import { useAtom } from "jotai";
import { doesMenuOpenAtom, mischiefPopupAtom } from "../../atom/atom";
import dummyData from "../../dummyData/dummyData";
import { useState } from "react";
import SignUp from "../Section/SignUpSection";
import LoginSection from "../Section/LoginSection";
import { Routes, Route } from "react-router-dom";

const NewsLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useAtom(doesMenuOpenAtom);
  const [isOpen] = useAtom(mischiefPopupAtom);
  const [isMember, setIsMember] = useState(false);

  return (
    <>
      <Header />
      {isMember ? <LoginSection /> : <SignUp />}
      {/* <Routes>
        <Route path="./signup" element={<SignUp />} />
        <Route path="./login" element={<LoginSection />} />
      </Routes> */}
      {isMenuOpen ? (
        <MenuBar data={dummyData.MenuBar} />
      ) : (
        <NewsContent categoryList={dummyData.MenuBar} />
      )}
      <TopButton />
      {isOpen && <MischiefPopup />}
    </>
  );
};

export default NewsLayout;
