// import { useLink } from "../../hooks/useLink";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import {
  bookmarkAtom,
  mischiefPopupAtom,
  isLoggedInAtom,
} from "../../atom/atom";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewsList = ({ data }) => {
  const dummyImage = "/image__hi.jpg";
  const isBreakingNews =
    data.content?.includes("breaking") ||
    data.description?.includes("breaking");
  const isExclusive =
    data.content.includes("exclusive") || data.description.includes("scoop");

  // 팝업 관련
  const [, setIsOpen] = useAtom(mischiefPopupAtom);
  // const popupRef = useLink(() => setIsOpen(false));
  // 북마크 atom
  const [bookmark, setBookmark] = useAtom(bookmarkAtom);

  // 로컬 상태: 관심 여부
  const [isInterest, setIsInterest] = useState(false);
  // 로그인되어 있는지 확인
  const [isLoggedin, setIsLoggedIn] = useAtom(isLoggedInAtom);

  const navigate = useNavigate();

  // data.url 기반으로 초기 관심 여부 체크
  useEffect(() => {
    setIsInterest(bookmark.some((a) => a.url === data.url));
  }, [bookmark, data.url]);

  // 관심 토글 함수
  const handelFavorite = () => {
    if (!isLoggedin) {
      console.log("헤이헤이 로그인 먼저");
      window.alert("로그인 해주세요!");
      navigate("/login");
      return;
    } else {
      console.log("ok 로그인 완료");
      const exists = bookmark.some((a) => a.url === data.url);

      if (exists) {
        // 이미 북마크 있음 -> 제거
        setBookmark(bookmark.filter((a) => a.url !== data.url));
        setIsInterest(false);
      } else {
        // 북마크 추가
        const newItem = {
          url: data.url,
          title: data.title,
          image: data.image,
        };
        setBookmark([newItem, ...bookmark]);
        setIsInterest(true);
      }
    }
  };

  return (
    <>
      <Link
        className="link__news"
        // ref={popupRef}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const lastSeen = localStorage.getItem("popupLastSeen");
          const today = new Date().toISOString().slice(0, 10);
          if (lastSeen !== today) {
            setIsOpen(true);
          } else {
            navigate("/detail", {
              state: {
                title: data.title,
                content: data.content,
                image: data.image,
                url: data.url,
              },
            });
          }
        }}
      >
        <div className="box__image">
          <img
            src={data.image}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = dummyImage;
            }}
            alt={data.title}
            className="image"
            loading="lazy"
          />
        </div>
      </Link>
      <a
        className="link__news-stories"
        // ref={popupRef}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const lastSeen = localStorage.getItem("popupLastSeen");
          const today = new Date().toISOString().slice(0, 10);
          if (lastSeen !== today) {
            setIsOpen(true);
          } else {
            navigate("/detail", {
              state: {
                title: data.title,
                content: data.content,
                image: data.image,
                url: data.url,
              },
            });
          }
        }}
      >
        <div className="box__info">
          <strong className="text__title">
            {isExclusive && <span className="tag__blue">exclusive</span>}
            {isBreakingNews && <span className="tag__red">breaking</span>}
            {data.title}
          </strong>
          {data.description && (
            <span className="text__description">{data.description}</span>
          )}
        </div>
      </a>
      <button
        type="button"
        className="button__favorite"
        onClick={handelFavorite}
      >
        {isInterest ? (
          <MdOutlineFavorite
            className="image"
            color="#fff"
            size={32}
            style={{
              filter: "drop-shadow(0px 4px 12px rgba(0,0,0,0.5))",
            }}
          />
        ) : (
          <MdOutlineFavoriteBorder
            className="image"
            color="#fff"
            size={32}
            style={{
              filter: "drop-shadow(0px 4px 12px rgba(0,0,0,0.4))",
            }}
          />
        )}
        <span className="for-a11y">관심</span>
      </button>
    </>
  );
};

export default NewsList;
