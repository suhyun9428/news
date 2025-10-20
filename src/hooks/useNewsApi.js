import { useEffect, useState } from "react";
import axios from "axios";

export const useNewsApi = (category = "General") => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://gnews.io/api/v4/search", {
          params: {
            q: category,
            lang: "en",
            max: 5,
            apikey: API_KEY,
          },
        });
        setArticles(res.data.articles);
      } catch (err) {
        console.error("❌ Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  return { articles, loading };
};
