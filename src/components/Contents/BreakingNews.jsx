import { useLink } from "../../hooks/useLink";
import { bookmarkAtom, mischiefPopupAtom } from "../../atom/atom";
import { useAtom } from "jotai";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { useState, useEffect } from "react";

const BreakingNewsContents = ({ data }) => {
  const dummyImage = "/image__hi.jpg";
  const isBreakingNews =
    data.content?.includes("breaking") || data.description?.includes("breaking");

  // 팝업 관련
  const [, setIsOpen] = useAtom(mischiefPopupAtom);
  const popupRef = useLink(() => setIsOpen(false));

  // 북마크 atom
  const [bookmark, setBookmark] = useAtom(bookmarkAtom);

  // 로컬 상태: 관심 여부
  const [isInterest, setIsInterest] = useState(false);

  // data.url 기반으로 초기 관심 여부 체크
  useEffect(() => {
    setIsInterest(bookmark.some((a) => a.url === data.url));
  }, [bookmark, data.url]);

  // 관심 토글 함수
  const handelFavorite = () => {
    const exists = bookmark.some((a) => a.url === data.url);

    if (exists) {
      // 이미 북마크 있음 → 제거
      setBookmark(bookmark.filter((a) => a.url !== data.url));
      setIsInterest(false);
    } else {
      // 북마크 추가
      const newItem = {
        url: data.url,
        title: data.title,
        image: data.image,
      };
      setBookmark([...bookmark, newItem]);
      setIsInterest(true);
    }
  };

  return (
    <div className="box__card">
      <a
        className="link__news"
        href={data.url}
        ref={popupRef}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
          setTimeout(() => {
            window.location.href = data.url;
          }, 3000);
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
          />
        </div>
      </a>
      <a
        className="link__news-stories"
        href={data.url}
        ref={popupRef}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
          setTimeout(() => {
            window.location.href = data.url;
          }, 3000);
        }}
      >
        <div className="box__info">
          <div className="box__title">
            <strong className="text__title">
              {isBreakingNews && <span className="tag__red">breaking</span>}
              {data.title}
            </strong>
          </div>
          {data.description && (
            <span className="text__description">{data.description}</span>
          )}
        </div>
      </a>
      {data.hasConnectedNews && (
        <ul className="list__breaking-news">
          {data.connectedNews.map((news, idx) => (
            <li key={idx} className="list-item">
              <a href={news.url} className="link__news">
                {news.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        className="button__favorite"
        onClick={handelFavorite}
      >
        {isInterest ? (
          <MdOutlineFavorite
            className="image"
            color="#fff"
            style={{ width: "32px", height: "32px" }}
          />
        ) : (
          <MdOutlineFavoriteBorder
            className="image"
            color="#fff"
            style={{ width: "32px", height: "32px" }}
          />
        )}
        <span className="for-a11y">관심</span>
      </button>
    </div>
  );
};

export default BreakingNewsContents;
