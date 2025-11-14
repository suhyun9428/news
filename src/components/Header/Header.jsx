import Weather from "./Weather";
import Member from "./Member";
import SearchBar from "./SearchBar";
import ControlDarkMode from "./ControlDarkMode";
import { FiLogOut } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoSearch } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import useFixedHeader from "../../hooks/useFixedHeader";
import useToggleMenu from "../../hooks/useToggleMenu";
import useHandleLogout from "../../hooks/useHandleLogout";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const {
    isMenuOpen,
    toggleMenu,
    searchOpen,
    toggleSearch,
    moveToMain,
    isLoggedin,
    isDarkMode,
  } = useToggleMenu();
  const { handleLogout } = useHandleLogout();

  const fillColor = isDarkMode ? "#fff" : "#000";
  useFixedHeader();

  return (
    <header>
      <div className="box__header">
        <button
          type="button"
          className={`button__menu ${isMenuOpen ? "button__menu-open" : ""}`}
          onClick={toggleMenu}
        >
          <span className="for-a11y">메뉴</span>
          {isMenuOpen ? (
            <IoClose className="image" style={{ color: fillColor }} />
          ) : (
            <RxHamburgerMenu className="image" style={{ color: fillColor }} />
          )}
        </button>
        <Link to="/" className="link__main" onClick={moveToMain}>
          <h1 className="text__title">SUN NEWS</h1>
        </Link>
        <Weather />
        <Member />
        <ControlDarkMode />
        {isLoggedin && isMenuOpen && (
          <button
            type="button"
            className="button__logout"
            onClick={handleLogout}
          >
            <FiLogOut className="image" />
            <span className="for-a11y">로그아웃</span>
          </button>
        )}
        <button
          type="button"
          className={`button__search ${
            searchOpen ? "button__search--active" : ""
          }`}
          onClick={toggleSearch}
        >
          <span className="for-a11y">검색</span>
          {searchOpen ? (
            <IoClose className="image" style={{ color: fillColor }} />
          ) : (
            <GoSearch className="image" style={{ color: fillColor }} />
          )}
        </button>
      </div>
      {searchOpen && <SearchBar />}
    </header>
  );
};

export default Header;
