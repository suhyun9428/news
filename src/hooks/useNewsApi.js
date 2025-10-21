import { useEffect, useState } from "react";

export const useNewsApi = (category = "general") => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/news?category=${category}`);
        const data = await res.json();
        setArticles(data);
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
