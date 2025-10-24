import { useEffect, useRef } from "react";

export const useLink = (callback) => {
  const ref = useRef(null);

  useEffect(() => {
    const handlePopup = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handlePopup);
    document.addEventListener("touchend", handlePopup);

    return () => {
      document.removeEventListener("mousedown", handlePopup);
      document.removeEventListener("touchend", handlePopup);
    };
  }, [callback]);

  return ref;
};