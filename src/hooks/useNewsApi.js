import { useEffect, useState } from "react";

export const useNewsApi = (category = "general", keyword = "" ) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        // 로컬 ? api 직접 호출 : 아님 vercel 프록시 경유
        const baseUrl = import.meta.env.DEV
          ? "https://gnews.io/api/v4"
          : "/api";

        const endpoint = keyword ? "search" : "top-headlines";
        
        const queryParams = new URLSearchParams({
          apikey: import.meta.env.VITE_NEWS_API_KEY,
          lang : 'en',
          max:5
        });

        if (endpoint === "top-headlines") { // 카테고리 > 최신 뉴스
          queryParams.append("category", category.toLowerCase());
        } else if (endpoint === "search") { // 검색 키워드 > 그 관련 내용들 노출
          queryParams.append("q", keyword);
        }

        const url = `${baseUrl}/${endpoint}?${queryParams.toString()}`;

        const res = await fetch(url);
        const data = await res.json();
        setArticles(data.articles || []);
        // console.log('category : ', category, 'keyword : ', keyword,"?!")
      } catch (err) {
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, keyword]);

  return { articles, loading };
};
