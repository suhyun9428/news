import Header from "../Header/Header";
import NewsContent from "./NewsContent";
import TopButton from "./TopButton";
import MischiefPopup from "../Popup/MischiefPopup";
import MenuBar from "../Header/MenuBar";
import { useAtom } from "jotai";
import { doesMenuOpenAtom, mischiefPopupAtom } from "../../atom/atom";
import dummyData from "../../dummyData/dummyData";

const NewsLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useAtom(doesMenuOpenAtom);
  const [isOpen] = useAtom(mischiefPopupAtom);

  return (
    <>
      <Header />
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
