import NewsList from "./NewsList";

const BreakingNews = ({ data }) => {
  return (
    <div className="box__breaking-news">
      <strong className="text__title">Breaking News</strong>
      <ul className="list-breaking-news">
        {data.map((item, idx) => {
          return (
            <li key={`item-${idx}`} className="list-item">
              <div className="box__card">
                <NewsList data={item} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BreakingNews;
