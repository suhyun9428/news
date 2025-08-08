const MainNewsContents = ({ data }) => {
  const imgUrl = data.imgUrl
    ? data.imgUrl
    : "//dummyimage.com/216x154/f5f5f5/000";

  return (
    <li className="list-item">
      <a href="#" className="link__news">
        <div className="box__info">
          <span className="text__title">
            {data.hasOnlyTag && <span className="tag__blue">단독</span>}
            {data.hasBreakingTag && <span className="tag__red">속보</span>}
            {data.title}
          </span>
        </div>
        <div className="box__image">
          <img src={imgUrl} alt={data.title} className="image" />
        </div>
      </a>
    </li>
  );
};

const MainNews = ({ data }) => {
  return (
    <div className="box__main-news">
      <ul className="list__main-news">
        {data.map((item, idx) => {
          return <MainNewsContents data={item} key={`item--${idx}`} />;
        })}
      </ul>
    </div>
  );
};

export default MainNews;
