import { useAtom } from "jotai";
import { isLoggedInAtom, isDarkModeAtom } from "../../atom/atom";
import { useNavigate } from "react-router-dom";
import { GoPerson } from "react-icons/go";
import { GoPersonFill } from "react-icons/go";

const Member = () => {
  const [isLoggedin, ] = useAtom(isLoggedInAtom);
  const [isDarkMode, ] = useAtom(isDarkModeAtom);

  const fillColor = isDarkMode ? "#fff" : "#000";
  const navigate = useNavigate();

  const handleLoginState = () => {
    if (!isLoggedin) {
      navigate("/signup");
    } else {
      // 로그인 상태일 때 마이페이지 노출
      navigate("/mypage");
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
