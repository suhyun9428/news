import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function SignupSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await res.json();
      console.log(data, "?data");

      if (res.ok) {
        setMessage("회원가입 성공!!" + data.message);
        // 로그인 페이지로 이동해야 하는데
      } else {
        setMessage("실패ㅠㅠ" + data.message);
      }
    } catch (err) {
      setMessage("에러 " + err.message);
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSignup}>
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
        <button type="submit">회원가입</button>
      </form>
      {/* 가입 상태 어떤지 */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default SignupSection;
