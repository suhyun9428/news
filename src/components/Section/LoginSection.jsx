import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { browserSessionPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { isLoggedInAtom, isDarkModeAtom } from "../../atom/atom";
import { useAtom } from "jotai";
import { LuEye } from "react-icons/lu";
import { HiEyeSlash } from "react-icons/hi2";

function LoginSection() {
  const [, setIsLoggedin] = useAtom(isLoggedInAtom);
  const [isDarkMode, ] = useAtom(isDarkModeAtom);
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
        setErrMessage("Invalid email or password.");
      } else if (err.code === "auth/wrong-password") {
        setErrMessage("Invalid password.");
      } else if (err.code === "auth/invalid-credential") {
        setErrMessage("Invalid email or password");
      } else if (err.code === "auth/invalid-email") {
        setErrMessage("Email is required.");
      } else if (err.code === "auth/missing-password") {
        setErrMessage("Password is required.");
      } else {
        console.log(err.code, "로그인 에러코드");
        setErrMessage("An error occurred during login. Please try again.");
      }
    }
  };

  return (
    <div className="box__login-container">
      <h2 className="text__title">Login</h2>
      <form className="form__login" onSubmit={handleLogin}>
        <label htmlFor="email">
          <input
            type="email"
            className={emailErr ? "form__input form__err" : "form__input"}
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailErr(false);
            }}
          />
        </label>
        <label htmlFor="password">
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <input
              type={pwVisible ? "text" : "password"}
              className={passwordErr ? "form__input form__err" : "form__input"}
              id="password"
              placeholder="Password"
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
                <>
                  <span className="for-a11y">비밀번호 표시</span>
                  <LuEye className="image" style={{ color: fillColor }} />
                </>
              ) : (
                <>
                  <span className="for-a11y">비밀번호 숨기기</span>
                  <HiEyeSlash className="image" style={{ color: fillColor }} />
                </>
              )}
            </button>
          </div>
        </label>
        {hasErr && <p className="text__err">{errMessage}</p>}
        <button type="submit" className="button__login">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginSection;
