import Header from "../Header/Header";
import NewsContent from "./NewsContent";
import TopButton from "./TopButton";
import MischiefPopup from "../Popup/MischiefPopup";
import MenuBar from "../Header/MenuBar";
import { useAtom } from "jotai";
import {
  doesMenuOpenAtom,
  mischiefPopupAtom,
  signupAtom,
} from "../../atom/atom";
import dummyData from "../../dummyData/dummyData";
import { useState } from "react";
import SignUp from "../Section/SignUpSection";
import LoginSection from "../Section/LoginSection";
import { Routes, Route } from "react-router-dom";

const NewsLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useAtom(doesMenuOpenAtom);
  const [isOpen] = useAtom(mischiefPopupAtom);
  const [openSignup, setOpenSignup] = useAtom(signupAtom);
  // console.log(openSignup,"왜 열려있어?")
  const [isMember, setIsMember] = useState(false);

  return (
    <>
      <Header />
      {openSignup ? (
        isMember ? (//가입된 정보인지 확인이 필요해
          <SignUp />
        ) : (
          <LoginSection />
        )
      ) : isMenuOpen ? (
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
