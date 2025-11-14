import { useAtom } from "jotai";
import { isLoggedInAtom, isDarkModeAtom } from "../../atom/atom";
import { useNavigate } from "react-router-dom";
import { GoPerson } from "react-icons/go";
import { GoPersonFill } from "react-icons/go";

const Member = () => {
  const [isLoggedin, setIsLoggedin] = useAtom(isLoggedInAtom);
  const [isDarkMode, setIsDarkMode] = useAtom(isDarkModeAtom);

  const fillColor = isDarkMode ? "#fff" : "#000";
  const navigate = useNavigate();

  const handleLoginState = () => {
    if (!isLoggedin) {
      navigate("/signup");
    } else {
      // 로그인 상태일 때 관심 리스트 노출
      navigate("/interest");
    }
  };

  return (
    <button type="button" className="button__login" onClick={handleLoginState}>
      {isLoggedin ? (
        <GoPersonFill className="image" style={{ color: fillColor }} />
      ) : (
        <GoPerson className="image" style={{ color: fillColor }} />
      )}
    </button>
  );
};

export default Member;
