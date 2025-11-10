import { useAtom } from "jotai";
import { GoPerson } from "react-icons/go";
import { signupAtom, loginAtom, memberAtom } from "../../atom/atom";
import { GoPersonFill } from "react-icons/go";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const Member = () => {
  const [openSignup, setOpenSignup] = useAtom(signupAtom);
  const [isLoggedin, setIsLoggedin] = useAtom(loginAtom);
  const [isMember, setIsMember] = useAtom(memberAtom);

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
