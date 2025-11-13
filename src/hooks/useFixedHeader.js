import { useEffect } from "react";

const useFixedHeader = () => {
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 55) {
        document.getElementById("root").classList.add("js-fixed");
      } else {
        document.getElementById("root").classList.remove("js-fixed");
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
};

export default useFixedHeader;
