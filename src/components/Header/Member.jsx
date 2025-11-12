import { useAtom } from "jotai";
import { isLoggedInAtom } from "../../atom/atom";
import { useNavigate } from "react-router-dom";
import { GoPerson } from "react-icons/go";
import { GoPersonFill } from "react-icons/go";

const Member = () => {
  const [isLoggedin, setIsLoggedin] = useAtom(isLoggedInAtom);

  const navigate = useNavigate();

  const handleLoginState = () => {
    if(!isLoggedin){
      navigate('/signup');
    } else {
      // 로그인 상태일 때 관심 리스트 노출
      navigate("/interest");
    } 
  };

  return (
    <button type="button" className="button__login" onClick={handleLoginState}>
      {isLoggedin ? (
        <GoPersonFill className="image" />
      ) : (
        <GoPerson className="image" color="#000" />
      )}
    </button>
  );
};

export default Member;
