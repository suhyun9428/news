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
    >
      <GoPerson className="image" color="#000" />
    </button>
  );
};

export default Member;
