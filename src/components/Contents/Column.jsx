const Column = ({ data }) => {
  return (
    <div className="box__column-contents">
      <h3 className="text__title">Editor’s Pick(Editorial)</h3>
      <ul className="list__articles">
        {data.map((item, idx) => {
          return (
            <li className="list-item" key={`item-${idx}`}>
              <a href="#" className="link__article">
                <div className="box__image">
                  <img
                    className="image"
                    src={item.imgUrl}
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div className="box__info">
                  <p className="text__subtitle">{item.title}</p>
                  <strong className="text__summary">{item.summary}</strong>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Column;
