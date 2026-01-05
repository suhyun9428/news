import { useAtom } from "jotai";
import { selectedKeywordAtom, mischiefPopupAtom } from "../../atom/atom";
import { useNewsApi } from "../../hooks/useNewsApi";

const IssueContent = ({ data }) => {
  const dummyImage = "/image__hi.jpg";
  const [, setIsOpen] = useAtom(mischiefPopupAtom);
  console.log('IssueContent data:', data);
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
                  loading="lazy"
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
  // articles.map(({ publishedAt }) => console.log(publishedAt,'publishedAt'));
  const sorted = articles.sort(({ publishedAt: a }, { publishedAt: b }) => new Date(b) - new Date(a))

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
        <h3 className="text__title">Issue</h3>
        <p className="text__issue">{newKeyword}</p>
      </div>
      <div className="box__issue-contents">
        <p className="text__title">
          Total <span className="text__emphasis">{articles.length}</span>
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
