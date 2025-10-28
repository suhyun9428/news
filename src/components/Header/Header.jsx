import Weather from "./Weather";
import SearchBar from "./SearchBar";
import { useAtom } from "jotai";
import { useEffect } from "react";
import {
  selectedSectionIndexAtom,
  doesMenuOpenAtom,
  doesSearchOpenAtom,
  selectedKeywordAtom,
} from "../../atom/atom";

const Header = () => {
  const [, setIndex] = useAtom(selectedSectionIndexAtom);
  const [isMenuOpen, setIsMenuOpen] = useAtom(doesMenuOpenAtom);
  const [searchOpen, setSearchOpen] = useAtom(doesSearchOpenAtom);
  const [, setNewKeyword] = useAtom(selectedKeywordAtom);

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
      {searchOpen && <SearchBar />}
    </header>
  );
};

export default Header;
