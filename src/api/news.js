// src/api/news.js
import axios from "axios";

export default async function handler(req, res) {
  const API_KEY = process.env.VITE_NEWS_API_KEY; // 환경변수
  const category = req.query.category?.toLowerCase() || "general";

  if (!API_KEY) {
    return res.status(500).json({ error: "API key not set" });
  }

  try {
    const response = await axios.get("https://gnews.io/api/v4/search", {
      params: {
        q: category,
        lang: "en",
        max: 5,
        token: API_KEY,
      },
    });

    res.status(200).json(response.data.articles);
  } catch (err) {
    console.error("❌ GNews API error:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({ error: err.message });
  }
}
