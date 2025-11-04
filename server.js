// server.js
import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = "./fake-db.json";

app.use(cors());
app.use(express.json());

// 🧠 JSON 파일 읽기/쓰기 유틸 함수
const readDB = () => JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
const writeDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

// 테스트용
app.get("/", (req, res) => res.send("✅ Server is running!"));

// 🧩 회원가입
app.post("/auth/signup", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "이메일과 비밀번호를 입력해주세요." });

  const db = readDB();
  const exists = db.users.find((u) => u.email === email);

  if (exists) {
    return res.status(409).json({ message: "이미 가입된 이메일입니다." });
  }

  const newUser = { id: Date.now(), email, password };
  db.users.push(newUser);
  writeDB(db);

  res.json({ message: "회원가입 성공!", user: newUser });
});

// 🧩 로그인
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const db = readDB();
  const user = db.users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "이메일 또는 비밀번호가 잘못되었습니다." });
  }

  res.json({ message: "로그인 성공!", user });
});

// 🧩 뉴스 저장 (내가 본 기사)
app.post("/news/view", (req, res) => {
  const { email, article } = req.body;
  if (!email || !article) return res.status(400).json({ message: "잘못된 요청입니다." });

  const db = readDB();
  const user = db.users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ message: "유저를 찾을 수 없습니다." });

  const newArticle = { id: Date.now(), email, ...article };
  db.articles.push(newArticle);
  writeDB(db);

  res.json({ message: "기사 저장 완료!", article: newArticle });
});

// 🧩 저장된 뉴스 조회
app.get("/news/:email", (req, res) => {
  const { email } = req.params;
  const db = readDB();
  const userArticles = db.articles.filter((a) => a.email === email);
  res.json(userArticles);
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
