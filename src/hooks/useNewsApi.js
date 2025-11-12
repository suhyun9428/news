import { useAtom } from "jotai";
import { newsCacheAtom } from "../atom/atom";
import { useEffect, useState } from "react";

export const useNewsApi = (category = "general", keyword = "" ) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsCache, setNewsCache] = useAtom(newsCacheAtom);

  useEffect(() => {
    if(!keyword && !category) return; // 유효한 입력 없으면 종료, 둘 다 없으면 fetch X
    
    const cacheKey = keyword || `category-${category}`; // 캐시 키 생성. 검색어가 있으면 검색어를, 없으면 카테고리명으로 고유 키 생성

    if (newsCache[cacheKey]) { // atom에 cacheKey에 해당하는 데이터가 있으면 api 호출 없이 바로 호출.
    // 검색 결과인 articles 값 있으면 걔를 캐시 값으로 바로 세팅, 로딩 상태 중지
      setArticles(newsCache[cacheKey]);
      setLoading(false);
      return;
    }

    const fetchNews = async () => { // api 호출 함수 정의
      try {
        setLoading(true); // fetch 전에 일단 로딩상태로 만들어두고

        // 로컬 ? api 직접 호출 : 아님 vercel 프록시 경유
        const baseUrl = import.meta.env.DEV
          ? "https://gnews.io/api/v4"
          : "/api";

        const endpoint = keyword ? "search" : "top-headlines"; // 엔드포인트, 검색어가 있으면 ? search : 카테고리별 최신 뉴스
        
        const queryParams = new URLSearchParams({ // api 쿼리 파라미터 설정
          apikey: import.meta.env.VITE_NEWS_API_KEY,
          lang : 'en',
          max:5
          // max:10
        });

        if (endpoint === "top-headlines") { // 카테고리 > 최신 뉴스
          queryParams.append("category", category.toLowerCase());
        } else if (endpoint === "search") { // 검색 키워드 > 그 관련 내용들 노출
          queryParams.append("q", keyword);
        }

        const url = `${baseUrl}/${endpoint}?${queryParams.toString()}`; // 최종 요청 URL 생성

        const res = await fetch(url); // api 호출 
        const data = await res.json(); // json 파싱~

        // setArticles(data.articles || []);
        const fetchedArticles = data.articles || []; // 기사 배열 추출 및 상태 업데이트, api 결과에 articles 없으면 빈 배열 뱉음
        setArticles(fetchedArticles);
        // console.log('category : ', category, 'keyword : ', keyword,"?!")
        setNewsCache((prev) => ({ ...prev, [cacheKey]: fetchedArticles })); // atom에 값 저장해서 같은 값이면 재호출하지 않아도 되게!
      } catch (err) {
        console.log('newsapi err', err)
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, keyword]);

  return { articles, loading };
};
