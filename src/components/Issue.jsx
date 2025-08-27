import { useAtom } from "jotai";
import { selectedKeyword } from "../atom/atom";

const IssueContent = ({ data }) => {
  return (
    <li className="list-item">
      <p className="text__date">
        {data.date.year}년 {data.date.month}월 {data.date.date}일
      </p>
      <ul className="list__issue-perday">
        {data.articles.map((article, i) => (
          <li className="list-item" key={i}>
            <a href="#" className="link__news">
              <div className="box__info">
                <span className="text__title">{article.title}</span>
                <p className="text__time">{article.date.time}</p>
              </div>
              <div className="box__image">
                <img
                  className="image"
                  src={article.imgUrl}
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

const Issue = ({ data }) => {
  const [newKeyword, setNewKeyword] = useAtom(selectedKeyword);

  const filtered = data.filter((item) => item.filterWord === newKeyword);

  const sorted = filtered.sort((a, b) => {
    const dateA = new Date(
      a.date.year,
      a.date.month - 1,
      a.date.date,
      ...a.date.time.split(":")
    );
    const dateB = new Date(
      b.date.year,
      b.date.month - 1,
      b.date.date,
      ...b.date.time.split(":")
    );
    return dateB - dateA; // 최신순
  });

  const grouped = sorted.reduce((acc, item) => {
    const key = `${item.date.year}-${item.date.month}-${item.date.date}`; // key는 기사 작성 일자

    if (!acc[key]) {
      // 날짜가 있으면
      acc[key] = {
        date: item.date, // 그룹 날짜
        articles: [item], // 첫 번째 기사 배열에 넣기
      };
      // acc은 아티클 내용들 push 받은 배열
      // item은 sorted에서 가져온 기사 데이터
      console.log("! acc : ", acc, "item : ", item, "key : ", key);
    } else {
      // 날짜가 없으면 생성
      acc[key].articles.push(item);
      console.log("0 acc : ", acc, "item : ", item, "key : ", key);
    }
    return acc;
  }, {});

  const merged = Object.values(grouped).map((group) => {
    group.articles.sort((a, b) => {
      const [hA, mA] = a.date.time.split(":").map(Number);
      const [hB, mB] = b.date.time.split(":").map(Number);
      return hB - hA || mB - mA; // 시 → 분 순서로 비교
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
          전체 기사 <span className="text__emphasis">{filtered.length}</span>건
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
