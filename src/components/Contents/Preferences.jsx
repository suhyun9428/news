import { useAtom } from "jotai";
import { useEffect } from "react";
import { selectedPageAtom, mischiefPopupAtom } from "../../atom/atom";
import { useNewsApi } from "../../hooks/useNewsApi";
import { Link, useNavigate } from "react-router-dom";

const Preferences = () => {
  const dummyInterestCategory = [
    { id: "Technology", label: "IT/기술" },
    { id: "Entertainment", label: "연예" },
    { id: "Sports", label: "스포츠" },
    { id: "Science", label: "과학" },
    { id: "Health", label: "건강" },
  ]

  // 2. 설정한 관심 카테고리 값 받아와서 홈에서 뿌리고
  const [page, setPage] = useAtom(selectedPageAtom);
  const [, setIsOpen] = useAtom(mischiefPopupAtom);
  const { articles } = useNewsApi(page);
  const oneArticle = articles.slice(0, 2);
  const dummyImage = "/image__hi.jpg";
  const navigate = useNavigate();

  useEffect(() => {
    setPage(dummyInterestCategory[0].id);
  }, []);

  const handleInterestCategory = (e, selectedCategory) => {
    e.preventDefault();
    e.stopPropagation();
    setPage(selectedCategory)
  }
  // 3. 카테고리 제목 가지고 뉴스 데이터 호출
  return(
    <>
      <div className="box__preference-news">
        <ul className="list__preference">
          {dummyInterestCategory.map((item, idx) => {
            const selectedCategory = item.id;
            return(
              <li className="list-item" key={`category-${idx}`}>
                <button type="button" className={`button ${page === selectedCategory ? 'button__active':''}`} onClick={(e)=>handleInterestCategory(e, selectedCategory)}>
                  <span className="text">{selectedCategory}</span>
                </button>
              </li>
            )
          })}
        </ul>
        <div className="box__articles">
          {oneArticle.map((item, idx) => {
            const isBreakingNews = item.content?.includes("breaking") || item.description?.includes("breaking");
            const isExclusive = item.content.includes("exclusive") || item.description.includes("scoop");

            return(
              <Link
                key={`item-${idx}`}
                className="link__news"
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
                        title: item.title,
                        content: item.content,
                        image: item.image,
                        url: item.url,
                      },
                    });
                  }
                }}>
                <div className="box__image">
                  <img
                    src={item.image}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = dummyImage;
                    }}
                    alt={item.title}
                    className="image"
                    loading="lazy"
                  />
                </div>
                <div className="box__info">
                  <p className="text__title">
                    {isExclusive && <span className="tag__blue">exclusive</span>}
                    {isBreakingNews && <span className="tag__red">breaking</span>}
                    {item.title}
                  </p>
                </div>
            </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Preferences;