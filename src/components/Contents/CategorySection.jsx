import { useAtom } from "jotai";
import { selectedPageAtom } from "../../atom/atom";
import { useNewsApi } from "../../hooks/useNewsApi";
import { mischiefPopupAtom } from "../../atom/atom";
// import { useLink } from "../../hooks/useLink";
import NewsList from "./NewsList";
import { useNavigate } from "react-router-dom";

const Contents = ({ data }) => {
  const dummyImage = "/image__hi.jpg";
  const [, setIsOpen] = useAtom(mischiefPopupAtom);
  // const popupRef = useLink(() => setIsOpen(false));
  const navigate = useNavigate();

  return (
    <a
      href={data.url}
      className="link__article"
      // ref={popupRef}
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
      <div className="box__image">
        <img
          src={data.image}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = dummyImage;
          }}
          alt={data.title}
          className="image"
          loading="lazy"
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
                <div className="box__card">
                  <NewsList data={item} />
                  {/* <Contents data={item} /> */}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default CategorySection;
