import { GoPerson } from "react-icons/go";

const Member = () => {
    // const []
  return (
    <button
      type="button"
      className="button__login"
      onClick={() => console.log("login!")}
      // 회원 가입 페이지
      // 로그인 하는 페이지
    >
      <GoPerson className="image" color="#000" />
    </button>
  );
};

export default Member;
