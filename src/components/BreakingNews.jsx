const BreakingNewsContents = ({ data }) => {
  const imgUrl = data.imgUrl
    ? data.imgUrl
    : "//dummyimage.com/720x480/f5f5f5/000";

  return (
    <>
      <a className="link__big-news" href="#">
        <div className="box__image">
          <img src={imgUrl} alt={data.title} />
        </div>
        <div className="box__info">
          <div className="box__title">
            {data.hasBreakingTag && <span className="tag__red">속보</span>}
            <strong className="text__title">{data.title}</strong>
          </div>
          {data.hasDescript && (
            <span className="text__description">{data.desc}</span>
          )}
        </div>
      </a>
      {data.hasConnectedNews && (
        <ul className="list__breaking-news">
          <li className="list-item">
            <a href="#" className="link__news">
              2주내로 정상회담할거임
            </a>
          </li>
          <li className="list-item">
            <a href="#" className="link__news">
              통상교섭본부장 “관세 합의, 소나기 피한 것···구조적 근본적 대비
              필요”
            </a>
          </li>
        </ul>
      )}
    </>
  );
};

const BreakingNews = ({ data }) => {
  return (
    <div className="box__breaking-news">
      <ul className="list-breaking-news">
        {data.map((item, idx) => {
          return (
            <li key={`item-${idx}`} className="list-item">
              <BreakingNewsContents data={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default BreakingNews;
