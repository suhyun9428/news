import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../firebase";
import { useAtom } from "jotai";
import { loginAtom } from "../../atom/atom";
import { useState } from "react";

const auth = getAuth(app);

function SignupSection() {
  const [openLogin, setOpenLogin] = useAtom(loginAtom);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault(); // 새로고침 방지!
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("회원가입 성공!");
      setOpenLogin(true);
    } catch (err) {
      console.log("에러 발생", err);
    }
  };

  return (
    <div className="box__signup-container">
      <h2 className="text__title">회원가입</h2>
      <form className="form__signup" onSubmit={onSubmit}>
        {/* 이름이랑 비밀번호 찾을 이메일 정보도 받으면 그럴듯해 보일거 같은데..! */}
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit" className="button__signup">
          회원가입
        </button>
      </form>
    </div>
  );
}
export default SignupSection;
