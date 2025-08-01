// import Weather from "./Weather";
import { useState } from "react";
import MenuBar from "./MenuBar";
import SearchBar from "./SearchBar";
import dummyData from "../dummyData/dummyData";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header>
      <div className="box__header">
        <button
          type="button"
          className={`button__menu ${isMenuOpen ? "button__menu-open" : ""}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="for-a11y">메뉴</span>
        </button>
        <h1 className="text__title">SUN NEWS</h1>
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
