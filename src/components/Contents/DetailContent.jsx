import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { bookmarkAtom, isLoggedInAtom } from '../../atom/atom';
import { useAtom } from 'jotai';

const DetailContent = () => {
  const dummyImage = "/image__hi.jpg";
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // state가 없으면 홈으로
  if (!state) return navigate("/");

  const { title, content, image, url } = state;
  const sliceContent = content?.substr(0, 250);
  
  const containerRef = useRef(null)
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const isScrollingRef = useRef(false);
  const [bookmark, setBookmark] = useAtom(bookmarkAtom);
  const [isInterest, setIsInterest] = useState(false);
  const [isLoggedin, setIsLoggedIn] = useAtom(isLoggedInAtom);

  useEffect(() => {
    setIsInterest(bookmark.some((a) => a.url === state.url));
  }, [bookmark, state.url]);

  const handelFavorite = () => {
    if (!isLoggedin) {
      window.alert("Please log in to continue!");
      navigate("/login");
      return;
    }
    const exists = bookmark.some((a) => a.url === state.url);
    if (exists) {
      // 이미 북마크 있음 -> 제거
      setBookmark(bookmark.filter((a) => a.url !== state.url));
      setIsInterest(false);
    } else {
      // 북마크 추가
      const newItem = {
        url: state.url,
        title: state.title,
        content: state.content,
        image: state.image,
      };
      setBookmark([newItem, ...bookmark]);
      setIsInterest(true);
    }
  };
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
        <p className="text__contents">{sliceContent ? `${sliceContent}...` : "Full content is not available for this article."}</p>
        <div className="box__move-wrap">
          <button
            type="button"
            className="button__favorite"
            onClick={handelFavorite}
          >
            {isInterest ? (
              <MdOutlineFavorite
                className="image"
                color="red"
                size={32}
              />
            ) : (
              <MdOutlineFavoriteBorder
                className="image"
                color="red"
                size={32}
              />
            )}
            <span className="for-a11y">관심</span>
          </button>
          <a
            href={url}
            className="link__article"
            target="_blank"
            rel="noopener noreferrer"
          >
            View the full article
            <IoIosArrowForward className="icon__go"/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DetailContent;
