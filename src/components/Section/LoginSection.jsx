import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";

function LoginSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("로그인 완료", userCredential.user);
      navigate("/"); // 로그인 후 뉴스 메인으로 이동
    } catch (err) {
      console.error("로그인 실패", err);
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
