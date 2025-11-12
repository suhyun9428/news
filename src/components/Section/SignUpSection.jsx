import {
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import app from "../../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

function SignupSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault(); // 새로고침 방지!

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      alert("이메일과 비밀번호를 입력해주세요");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        trimmedEmail,
        trimmedPassword
      );
      console.log("회원가입 성공!");
      navigate("../login");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        window.alert("이미 회원 가입된 정보입니다. 로그인해주세요");
        navigate("../login");
      } else if (err.code === "auth/invalid-email") {
        window.alert("유효하지 않은 이메일 형식입니다");
      } else if (err.code === "auth/weak-password") {
        window.alert("비밀번호가 너무 약합니다 (최소 6자리 필요)");
      } else {
        console.log("회원가입 에러:", err);
        window.alert("회원가입 중 오류가 발생했습니다");
      }
    }
  };

  const moveToLogin = () => {
    navigate("../login");
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
      <p className="text__hi-there">회원이신가요?</p>
      <button type="button" className="button__login" onClick={moveToLogin}>
        로그인하러 가기
      </button>
    </div>
  );
}
export default SignupSection;
