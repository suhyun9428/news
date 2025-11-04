import { useState } from "react";

function LoginSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
          email : email, 
          password : password 
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("로그인 성공!! 토큰이 머냐면~ " + data.token);
        // 여기서 토큰 localStorage에 저장
        // localStorage.setItem('token', data.token);
      } else {
        setMessage("실패ㅠㅠㅠㅠ " + data.message);
      }
    } catch (err) {
      setMessage("에러!! " + err.message);
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
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
        /><br />
        <button type="submit">로그인</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LoginSection;
