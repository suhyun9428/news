import { useAtom } from "jotai";
import { GoPerson } from "react-icons/go";
import { signupAtom } from "../../atom/atom";

const Member = () => {
  const [openSignup, setOpenSignup] = useAtom(signupAtom);

  return (
    <button
      type="button"
      className="button__login"
      onClick={()=>setOpenSignup(true)}
      // 회원 가입 페이지
      // 로그인 하는 페이지
    >
      <GoPerson className="image" color="#000" />
    </button>
  );
};

export default Member;
