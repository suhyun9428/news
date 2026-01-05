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
  const [isDarkMode, setIsDarkMode] = useAtom(isDarkModeAtom);
  const [hasErr, setHasErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const fillColor = isDarkMode ? "#fff" : "#000";
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault(); // 새로고침 방지!

    // const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // if(trimmedName === ''){
    //   setErrMessage('이름을 입력해주세요.')
    // }

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
        setErrMessage("이미 회원 가입된 정보입니다. 로그인해주세요");
        navigate("../login");
      } else if (err.code === "auth/invalid-email") {
        setErrMessage("이메일을 확인해주세요.");
      } else if (err.code === "auth/weak-password") {
        setErrMessage("비밀번호가 너무 약합니다 (최소 6자리 필요)");
      } else {
        console.log("회원가입 에러:", err);
        setErrMessage("회원가입 중 오류가 발생했습니다");
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
        <label htmlFor="name">이름</label>
        <input
          id="name"
          type="text"
          className={passwordErr ? "form__input form__err" : "form__input"}
          placeholder="이름 입력"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          className={passwordErr ? "form__input form__err" : "form__input"}
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">비밀번호</label>
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <input
            id="password"
            type={pwVisible ? "text" : "password"}
            className={passwordErr ? "form__input form__err" : "form__input"}
            placeholder="비밀번호 입력"
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
            {pwVisible ? <LuEye className="image"  style={{ color: fillColor }}/> : <HiEyeSlash  style={{ color: fillColor }}/>}
          </button>
        </div>
      {hasErr && <p className="text__err">{errMessage}</p>}
        <button type="submit" className="button__signup">
          SignUp
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
