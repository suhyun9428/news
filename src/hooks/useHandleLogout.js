import { getAuth, signOut } from "firebase/auth";
import { useAtom } from "jotai";
import { doesMenuOpenAtom } from "../atom/atom";
import { useNavigate } from "react-router-dom";

const useHandleLogout = () => {
  const [isMenuOpen, setIsMenuOpen] = useAtom(doesMenuOpenAtom);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await signOut(auth);
      window.alert("로그아웃 되었습니다.");
      setIsMenuOpen(false);
      navigate("/");
    } catch (err) {
      console.log("로그아웃 err", err);
    }
  };
  return { handleLogout };
};

export default useHandleLogout;
