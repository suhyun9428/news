import Weather from "./Weather";
import { useAtom } from "jotai";
import MenuBar from "./MenuBar";
import SearchBar from "./SearchBar";
import dummyData from "../dummyData/dummyData";
import { useEffect } from "react";
import {
  selectedSectionIndex,
  doesMenuOpen,
  doesSearchOpen,
  selectedKeyword,
} from "../atom/atom";

const Header = ({ data }) => {
  const [index, setIndex] = useAtom(selectedSectionIndex);
  const [isMenuOpen, setIsMenuOpen] = useAtom(doesMenuOpen);
  const [searchOpen, setSearchOpen] = useAtom(doesSearchOpen);
  const [newKeyword, setNewKeyword] = useAtom(selectedKeyword);

  const moveToMain = () => {
    setIndex(null);
    setIsMenuOpen(false);
    setNewKeyword(null);
  };

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 55) {
        document.getElementById("root").classList.add("js-fixed");
      } else {
        document.getElementById("root").classList.remove("js-fixed");
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header>
      <div className="box__header">
        <button
          type="button"
          className={`button__menu ${isMenuOpen ? "button__menu-open" : ""}`}
          onClick={() => {
            setIsMenuOpen((prev) => !prev);
          }}
        >
          <span className="for-a11y">메뉴</span>
        </button>
        <a href="#" className="link__main" onClick={() => moveToMain()}>
          <h1 className="text__title">SUN NEWS</h1>
        </a>
        <Weather />
        <button
          type="button"
          className={`button__search ${
            searchOpen ? "button__search--active" : ""
          }`}
          onClick={() => setSearchOpen((prev) => !prev)}
        >
          <span className="for-a11y">검색</span>
        </button>
      </div>
      {isMenuOpen && <MenuBar data={data} />}
      {searchOpen && <SearchBar />}
    </header>
  );
};

export default Header;
