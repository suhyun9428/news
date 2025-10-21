import { useAtom } from "jotai";
import { selectedSectionIndex, selectedPage } from "../atom/atom";

const Contents = ({ data }) => {
  const imgUrl = data.image
    ? data.image
    : "//dummyimage.com/720x480/f5f5f5/000";

  return (
    <a href={data.url} className="link__article">
      <div className="box__image">
        <img className="image" src={imgUrl} alt={data.title} />
      </div>
      <div className="box__info">
        <strong className="text__ttile">{data.title}</strong>
        {data.description && (
          <span className="text__description">{data.description}</span>
        )}
      </div>
    </a>
  );
};

const CategorySection = ({ data }) => {
  return (
    <div className="box__category-contents">
      <h3 className="text__title">사설</h3>
      <div className="box__inner">
        <ul className="list__articles">
          {data.map((item, idx) => {
            return (
              <li className="list-item" key={`item-${idx}`}>
                <Contents data={item} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default CategorySection;
