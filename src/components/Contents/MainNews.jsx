import { mischiefPopupAtom } from "../../atom/atom";
import { useAtom } from "jotai";
import { useLink } from "../../hooks/useLink";

const MainNewsContents = ({ data }) => {
  const dummyImage = "/image__hi.jpg";
  const isBreakingNews =
    data.content.includes("breaking") || data.description.includes("breaking");
  const isExclusive =
    data.content.includes("exclusive") || data.description.includes("scoop");
  const [, setIsOpen] = useAtom(mischiefPopupAtom);
  const popupRef = useLink(() => setIsOpen(false));

  return (
    <li className="list-item">
      <a
        href={data.url}
        className="link__news"
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
        <div className="box__info">
          <span className="text__title">
            {isExclusive && <span className="tag__blue">exclusive</span>}
            {isBreakingNews && <span className="tag__red">breaking</span>}
            {data.title}
          </span>
        </div>
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
