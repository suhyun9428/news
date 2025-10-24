import { useAtom } from "jotai";
import { selectedPageAtom } from "../atom/atom";
import { useNewsApi } from "../hooks/useNewsApi";
import { mischiefPopupAtom } from "../atom/atom";
import { useLink } from "../hooks/useLink";

const Contents = ({ data }) => {
  const dummyImage = "/image__hi.jpg";
  const [, setIsOpen] = useAtom(mischiefPopupAtom);
  const popupRef = useLink(() => setIsOpen(false));

  return (
    <a
      href={data.url}
      className="link__article"
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
      <div className="box__image">
        <img
          src={data.image}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = dummyImage;
          }}
          alt={data.title}
          className="image"
        />
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

const CategorySection = () => {
  const [page] = useAtom(selectedPageAtom);
  const { articles } = useNewsApi(page);

  return (
    <div className="box__category-contents">
      <h3 className="text__title">전체</h3>
      <div className="box__inner">
        <ul className="list__articles">
          {articles.map((item, idx) => {
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
