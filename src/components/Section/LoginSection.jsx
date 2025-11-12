import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { isLoggedInAtom } from "../../atom/atom";
import { useAtom } from "jotai";

function LoginSection() {
  const [isLoggedin, setIsLoggedin] = useAtom(isLoggedInAtom);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    try {
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        trimmedEmail,
        trimmedPassword
      );
      console.log("로그인 완료", userCredential.user);
      setIsLoggedin(true);
      navigate("/"); // 로그인 후 뉴스 메인으로 이동
    } catch (err) {
      console.error("로그인 실패", err);
      if (err.code === "auth/user-not-found") {
        window.alert("존재하지 않는 계정 정보입니다.");
      } else if (err.code === "auth/wrong-password") {
        window.alert("비밀 번호를 확인해주세요.");
      } else if (err.code === "auth/invalid-credential") {
        window.alert(" 잘못된 인증");
      } else {
        console.log(err.code, "로그인 에러코드");
      }
    }
  };

  return (
    <div className="box__login-container">
      <h2 className="text__title">로그인</h2>
      <form className="form__login" onSubmit={handleLogin}>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit" className="button__login">
          로그인
        </button>
      </form>
    </div>
  );
}

export default LoginSection;
