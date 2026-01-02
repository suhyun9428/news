import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";

const DetailContent = () => {
  const dummyImage = "/image__hi.jpg";
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // state가 없으면 홈으로
  if (!state) return navigate("/");

  const { title, content, image, url } = state;
  const sliceContent = content.substr(0, 250);
  
  const containerRef = useRef(null)
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleStart = (e) => {
      const touch = e.touches[0];
      startXRef.current = touch.clientX;
      startYRef.current = touch.clientY;
      isScrollingRef.current = false;
    };

    const handleMove = (e) => {
      const touch = e.touches[0];
      const deltaY = Math.abs(touch.clientY - startYRef.current);

      if(deltaY > 10) {
        isScrollingRef.current = true;
      };
    };

    const handleEnd = (e) => {
      const touch = e.changedTouches[0];

      const startX = startXRef.current;
      const startY = startYRef.current;

      const endX = touch.clientX;
      const endY = touch.clientY;

      const deltaX = endX - startX;
      const deltaY = Math.abs(endY - startY);

      if (isScrollingRef.current) return;

      if (!isScrollingRef.current && startX < window.innerWidth * 0.25 && deltaX > 80 && deltaY < 50) {
        history.back();
      }
    };

    el.addEventListener('touchstart', handleStart);
    el.addEventListener('touchmove', handleMove, {
      passive:true,
    });
    el.addEventListener('touchend', handleEnd);
    return () => {
      el.removeEventListener('touchstart', handleStart);
      el.removeEventListener('touchmove', handleMove);
      el.removeEventListener('touchend', handleEnd);
    }
  }, []);

  return (
    <div className="box__detail" ref={containerRef}>
      <div className="box__image">
        <img src={image} alt={title} className="image" loading="lazy" onError={(e)=>{
          e.currentTarget.onerror = null;
          e.currentTarget.src = dummyImage;
        }} />
      </div>
      <div className="box__contents">
        <h2 className="text__title">{title}</h2>
        <p className="text__contents">{sliceContent ? `${sliceContent}...` : "내용이 제공되지 않은 기사입니다."}</p>
        <a
          href={url}
          className="link__article"
          target="_blank"
          rel="noopener noreferrer"
        >
          기사 원문 보러가기
          <FaArrowRight className="icon__go" />
        </a>
      </div>
    </div>
  );
};

export default DetailContent;
