import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { HiEyeSlash } from "react-icons/hi2";
import { useAtom } from "jotai";
import { isDarkModeAtom } from "../../atom/atom";

const auth = getAuth(app);

function SignupSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwVisible, setPwVisible] = useState(false);
  const [isDarkMode, ] = useAtom(isDarkModeAtom);
  const [hasErr, setHasErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const fillColor = isDarkMode ? "#fff" : "#000";
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (trimmedEmail === "") {
      setEmailErr(true);
    }
    if (trimmedPassword === "") {
      setPasswordErr(true);
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
      setHasErr(true);
      if (err.code === "auth/email-already-in-use") {
        setErrMessage("This email is already registered.");
        navigate("../login");
      } else if (err.code === "auth/invalid-email") {
        setErrMessage("Please check your email address.");
      } else if (err.code === "auth/weak-password") {
        setErrMessage("Password must be at least 6 characters.");
      } else {
        console.log("회원가입 에러:", err);
        setErrMessage("An error occurred while creating your account.");
      }
    }
  };

  const moveToLogin = () => {
    navigate("../login");
  };

  return (
    <div className="box__signup-container">
      <h2 className="text__title">SignUp</h2>
      <form className="form__signup" onSubmit={onSubmit}>
        <label htmlFor="name">
          <input
            id="name"
            type="text"
            className={passwordErr ? "form__input form__err" : "form__input"}
            placeholder="User Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          <input
            id="email"
            type="email"
            className={passwordErr ? "form__input form__err" : "form__input"}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <input
              id="password"
              type={pwVisible ? "text" : "password"}
              className={passwordErr ? "form__input form__err" : "form__input"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
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
                  <LuEye className="image"  style={{ color: fillColor }}/>
                </>
              ) : (
                <>
                  <span className="for-a11y">비밀번호 숨기기</span>
                  <HiEyeSlash  style={{ color: fillColor }}/>
                </>
              )}
            </button>
          </div>
        </label>
      {hasErr && <p className="text__err">{errMessage}</p>}
        <button type="submit" className="button__signup">
          SignUp
        </button>
      </form>
      <p className="text__hi-there">Have an account?</p>
      <button type="button" className="button__login" onClick={moveToLogin}>
        Sign in here
      </button>
    </div>
  );
}
export default SignupSection;
