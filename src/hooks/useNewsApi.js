import { useEffect, useState } from "react";
import axios from "axios";

export const useNewsApi = (category = "General") => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
//   console.log("category1:", category);
  const query = category || 'general';

  if(import.meta.env.VITE_NEWS_API_KEY){
      console.log("돌아와제발");
  }
  console.log("category2:", category, query);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://gnews.io/api/v4/search", {
          params: {
            q: query,
            lang: "en",
            max: 5,
            token: API_KEY,
          },
        });
        setArticles(res.data.articles);
      } catch (err) {
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  return { articles, loading };
};
