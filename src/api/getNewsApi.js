import { useEffect, useState } from "react";
import axios from "axios";

export const NewsApi = async (params = {}) => {
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  try {
    const res = await axios.get("https://gnews.io/api/v4/search", {
      params: {
        q: category,
        lang: "en",
        max: 5,
        token: API_KEY,
        ...params,
      },
    });
    return res.data.articles;
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    return [];
  }
};
