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
  loginAtom,
  memberAtom,
} from "../../atom/atom";
import { FiLogOut } from "react-icons/fi";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Header = () => {
  const [index, setIndex] = useAtom(selectedSectionIndexAtom);
  const [isMenuOpen, setIsMenuOpen] = useAtom(doesMenuOpenAtom);
  const [searchOpen, setSearchOpen] = useAtom(doesSearchOpenAtom);
  const [newKeyword, setNewKeyword] = useAtom(selectedKeywordAtom);
  const [isLoggedin, setIsLoggedin] = useAtom(loginAtom);
  const [isMember, setIsMember] = useAtom(memberAtom);

  const moveToMain = () => {
    console.log('move to main!')
    setIndex(null);
    setIsMenuOpen(false);
    setNewKeyword(null);

  };
  const handleLogout = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    signOut(auth).then(()=>{
      console.log('로그아웃!')
      window.alert('로그아웃 되었습니다.')
      // moveToMain();
    }).catch((err)=>{
      console.log('err', err)
    })
  };

  const handleMenu = () => {
    console.log("열려라 메뉴")
    setIsMenuOpen((prev) => !prev);
  }

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
          onClick={()=>handleMenu()}
        >
          <span className="for-a11y">메뉴</span>
        </button>
        <a href="#" className="link__main" onClick={() => moveToMain()}>
          <h1 className="text__title">SUN NEWS</h1>
        </a>
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
