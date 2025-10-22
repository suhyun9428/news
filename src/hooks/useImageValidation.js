import { useState, useEffect } from "react";

export const useImageValidation = (url) => {
  const [isValid, setIsValid] = useState(null); // null: 검사 전, true/false: 결과

  useEffect(() => {
    if (!url) return;

    const img = new Image();
    img.src = url;

    img.onload = () => setIsValid(true);
    img.onerror = () => setIsValid(false);

    // cleanup (메모리 누수 방지)
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [url]);

  return isValid;
};
