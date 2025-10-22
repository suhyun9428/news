const MainNewsContents = ({ data }) => {
  const imgUrl = data.image
    ? data.image
    : "//dummyimage.com/216x154/f5f5f5/000";
  const isBreakingNews = data.content.includes('breaking') || data.description.includes('breaking');
  const isExclusive = data.content.includes('exclusive') || data.description.includes('scoop');
  
  return (
    <li className="list-item">
      <a href="#" className="link__news">
        <div className="box__info">
          <span className="text__title">
            {isExclusive && <span className="tag__blue">exclusive</span>}
            {isBreakingNews && <span className="tag__red">breaking</span>}
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
