import Weather from "./Weather";
import Member from "./Member";
import SearchBar from "./SearchBar";
import { useAtom } from "jotai";
import { useEffect } from "react";
import {
  selectedSectionIndexAtom,
  doesMenuOpenAtom,
  doesSearchOpenAtom,
  selectedKeywordAtom,
  isLoggedInAtom,
} from "../../atom/atom";
import { FiLogOut } from "react-icons/fi";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [index, setIndex] = useAtom(selectedSectionIndexAtom);
  const [isMenuOpen, setIsMenuOpen] = useAtom(doesMenuOpenAtom);
  const [searchOpen, setSearchOpen] = useAtom(doesSearchOpenAtom);
  const [newKeyword, setNewKeyword] = useAtom(selectedKeywordAtom);
  const [isLoggedin, setIsLoggedin] = useAtom(isLoggedInAtom);

  const navigate = useNavigate();

  const moveToMain = () => {
    console.log("떠나요~메인으로~");
    setIndex(null);
    setIsMenuOpen(false);
    setNewKeyword(null);
    navigate("/");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("로그아웃!");
        window.alert("로그아웃 되었습니다.");
        setIsMenuOpen(false);
        navigate("/");
      })
      .catch((err) => {
        console.log("로그아웃 err", err);
      });
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

  useEffect(() => {
    if (isMenuOpen) {
      navigate("/menubar");
      setIsMenuOpen(true);
    } else {
      navigate("/");
      setIsMenuOpen(false);
    }
  }, [isMenuOpen]);

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header>
      <div className="box__header">
        <button
          type="button"
          className={`button__menu ${isMenuOpen ? "button__menu-open" : ""}`}
          onClick={() => handleMenu()}
        >
          <span className="for-a11y">메뉴</span>
        </button>
        <Link to="/" className="link__main" onClick={() => moveToMain()}>
          <h1 className="text__title">SUN NEWS</h1>
        </Link>
        <Weather />
        <Member />
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
