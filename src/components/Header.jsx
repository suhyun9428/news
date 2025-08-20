// import Weather from "./Weather";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import MenuBar from "./MenuBar";
import SearchBar from "./SearchBar";
import dummyData from "../dummyData/dummyData";
import {
  selectedSectionIndex,
  doesMenuOpen,
  selectedKeyword,
} from "../atom/atom";

const Header = () => {
  const [index, setIndex] = useAtom(selectedSectionIndex);
  const [isMenuOpen, setIsMenuOpen] = useAtom(doesMenuOpen);
  const [searchOpen, setSearchOpen] = useState(false);
  const [newKeyword, setNewKeyword] = useAtom(selectedKeyword);

  const moveToMain = () => {
    setIndex(null);
    setIsMenuOpen(false);
    setNewKeyword(null);
  };

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
      {isMenuOpen && <MenuBar data={dummyData.menuBar} />}
      {/* <Weather /> */}
      {searchOpen && <SearchBar />}
    </header>
  );
};

export default Header;
