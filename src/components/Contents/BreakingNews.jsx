import { useLink } from "../../hooks/useLink";
import { mischiefPopupAtom } from "../../atom/atom";
import { useAtom } from "jotai";

const BreakingNewsContents = ({ data }) => {
  const dummyImage = "/image__hi.jpg";
  const isBreakingNews =
    data.content.includes("breaking") || data.description.includes("breaking");
  const [, setIsOpen] = useAtom(mischiefPopupAtom);
  const popupRef = useLink(() => setIsOpen(false));

  return (
    <>
      <a
        className="link__big-news"
        href={data.url}
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
          <div className="box__title">
            <strong className="text__title">
              {isBreakingNews && <span className="tag__red">breaking</span>}
              {data.title}
            </strong>
          </div>
          {data.description && (
            <span className="text__description">{data.description}</span>
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
