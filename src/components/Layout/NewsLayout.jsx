import NewsContent from "./NewsContent";
import TopButton from "./TopButton";
import MischiefPopup from "../Popup/MischiefPopup";
import MenuBar from "../Header/MenuBar";
import { useAtom } from "jotai";
import { doesMenuOpenAtom, mischiefPopupAtom, isLoggedInAtom, isMemberAtom } from "../../atom/atom";
import dummyData from "../../dummyData/dummyData";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const NewsLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useAtom(doesMenuOpenAtom);
  const [isOpen] = useAtom(mischiefPopupAtom);
  const [isLoggedin, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [isMember, setIsMember] = useAtom(isMemberAtom);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("로그인 되어 있음", user);
        setIsLoggedIn(true);
        setIsMember(true);
      } else {
        console.log("로그아웃 상태");
        setIsLoggedIn(false);
        setIsMember(false);
      }
    });
    return () => unsubscribe();
  }, [setIsLoggedIn, setIsMember]);

  return (
    <>
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
