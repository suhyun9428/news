import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const TopButton = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleTopButton = () => {
      const currentY = window.scrollY;
      if (currentY > 130) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }
    };
    window.addEventListener("scroll", handleTopButton);
    return () => {
      window.removeEventListener("scroll", handleTopButton);
    };
  }, []);

  const moveToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showTop) return null;

  return (
    <footer>
      <button type="button" className="button__top" onClick={moveToTop}>
        <FaArrowUp fill="#000" />
      </button>
    </footer>
  );
};

export default TopButton;
