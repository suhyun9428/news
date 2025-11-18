import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { isLoggedInAtom, isDarkModeAtom } from "../../atom/atom";
import { useAtom } from "jotai";
import { LuEye } from "react-icons/lu";
import { HiEyeSlash } from "react-icons/hi2";

function LoginSection() {
  const [isLoggedin, setIsLoggedin] = useAtom(isLoggedInAtom);
  const [isDarkMode, setIsDarkMode] = useAtom(isDarkModeAtom);
  const [hasErr, setHasErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [pwVisible, setPwVisible] = useState(false);
  const fillColor = isDarkMode ? "#fff" : "#000";

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (trimmedEmail === "") {
      setEmailErr(true);
    }
    if (trimmedPassword === "") {
      setPasswordErr(true);
    }
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
      setHasErr(true);
      if (err.code === "auth/user-not-found") {
        setErrMessage("존재하지 않는 계정 정보입니다.");
      } else if (err.code === "auth/wrong-password") {
        setErrMessage("비밀번호를 확인해주세요.");
      } else if (err.code === "auth/invalid-credential") {
        setErrMessage("아이디/비밀번호를 확인해주세요.");
      } else if (err.code === "auth/invalid-email") {
        setErrMessage("아이디를 입력해주세요.");
      } else if (err.code === "auth/missing-password") {
        setErrMessage("비밀번호를 입력해주세요.");
      } else {
        console.log(err.code, "로그인 에러코드");
        setErrMessage("로그인 중 에러가 발생했습니다.");
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
          className={emailErr ? "form__input form__err" : "form__input"}
          id="email"
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailErr(false);
          }}
        />
        <label htmlFor="password">비밀번호</label>
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <input
            type={pwVisible ? "text" : "password"}
            className={passwordErr ? "form__input form__err" : "form__input"}
            id="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordErr(false);
            }}
          />
          <button
            type="button"
            onClick={() => setPwVisible((prev) => !prev)}
            className="button__visible"
          >
            {pwVisible ? (
              <LuEye className="image" style={{ color: fillColor }} />
            ) : (
              <HiEyeSlash className="image" style={{ color: fillColor }} />
            )}
          </button>
        </div>
        {hasErr && <p className="text__err">{errMessage}</p>}
        <button type="submit" className="button__login">
          로그인
        </button>
      </form>
    </div>
  );
}

export default LoginSection;
