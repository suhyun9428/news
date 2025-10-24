import { useAtom } from "jotai";
import { selectedKeywordAtom, mischiefPopupAtom } from "../atom/atom";
import { useNewsApi } from "../hooks/useNewsApi";
import { useLink } from "../hooks/useLink";

const IssueContent = ({ data }) => {
  const dummyImage = "/image__hi.jpg";
  const [, setIsOpen] = useAtom(mischiefPopupAtom);
  const popupRef = useLink(() => setIsOpen(false));

  return (
    <li className="list-item">
      <p className="text__date">
        {data.date.year}년 {data.date.month}월 {data.date.date}일
      </p>
      <ul className="list__issue-perday">
        {data.articles.map((article, i) => (
          <li className="list-item" key={i}>
            <a
              href={article.url}
              className="link__news"
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
                <span className="text__title">{article.title}</span>
                <p className="text__time">{article.date.time}</p>
              </div>
              <div className="box__image">
                <img
                  className="image"
                  src={article.image}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = dummyImage;
                  }}
                  alt={article.title}
                />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
};

const Issue = () => {
  const [newKeyword] = useAtom(selectedKeywordAtom);
  const { articles } = useNewsApi("general", newKeyword);

  const sorted = articles.sort((a, b) => {
    return new Date(b.publishAt) - new Date(a.publishAt);
  });

  const grouped = sorted.reduce((acc, item) => {
    const date = new Date(item.publishedAt);

    // 날짜 포맷 만들기
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const key = `${year}-${month}-${day}`;

    if (!acc[key]) {
      acc[key] = {
        date: { year, month, date: day },
        articles: [],
      };
    }

    acc[key].articles.push({
      ...item,
      date: { year, month, date: day, time: `${hours}:${minutes}` },
    });

    return acc;
  }, {});

  const merged = Object.values(grouped).map((group) => {
    group.articles.sort((a, b) => {
      const dateA = new Date(a.publishedAt);
      const dateB = new Date(b.publishedAt);
      return dateB - dateA;
    });
    return group;
  });

  return (
    <div className="box__issue">
      <div className="box__issue-title">
        <h3 className="text__title">이슈</h3>
        <p className="text__issue">{newKeyword}</p>
      </div>
      <div className="box__issue-contents">
        <p className="text__title">
          전체 기사 <span className="text__emphasis">{articles.length}</span>건
        </p>
        <ul className="list__issue">
          {merged.map((group, idx) => (
            <IssueContent key={`article-${idx}`} data={group} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Issue;
