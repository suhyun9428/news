import { useAtom } from "jotai";
import {
  selectedSectionIndexAtom,
  doesMenuOpenAtom,
  doesSearchOpenAtom,
  selectedKeywordAtom,
  isLoggedInAtom,
} from "../atom/atom";
import { useNavigate } from "react-router-dom";

const useToggleMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useAtom(doesMenuOpenAtom);
  const [searchOpen, setSearchOpen] = useAtom(doesSearchOpenAtom);
  const [index, setIndex] = useAtom(selectedSectionIndexAtom);
  const [newKeyword, setNewKeyword] = useAtom(selectedKeywordAtom);
  const [isLoggedin, setIsLoggedin] = useAtom(isLoggedInAtom);

  const navigate = useNavigate();

  const toggleMenu = () => {
    const next = !isMenuOpen;
    setIsMenuOpen(next);
    navigate(next ? "/menubar" : "/");
  };

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
  };

  const moveToMain = () => {
    console.log("메인으로~");
    setIndex(null);
    setIsMenuOpen(false);
    setNewKeyword(null);
    navigate("/");
  };

  return {
    isMenuOpen,
    toggleMenu,
    searchOpen,
    toggleSearch,
    moveToMain,
    isLoggedin,
  };
};

export default useToggleMenu;
