import { useAtom } from "jotai";
import { selectedSectionIndex, selectedPage } from "../atom/atom";
import { useNewsApi } from "../hooks/useNewsApi";
import { useImageValidation } from "../hooks/useImageValidation";
import { mischiefPopup } from "../atom/atom";
import useLink from "../hooks/useLink";

const Contents = ({ data }) => {
  // const imgUrl = data.image
  //   ? data.image
  //   : "//dummyimage.com/720x480/f5f5f5/000";
  var imgUrl;
  const dummyImage = "../../public/image__hi.jpg";
  const isValidImage = useImageValidation(data.image);
  {
    isValidImage === null ? dummyImage : (imgUrl = data.image);
  }
  const [isOpen, setIsOpen] = useAtom(mischiefPopup);
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
  const [page, setPage] = useAtom(selectedPage);
  const { articles, loading } = useNewsApi(page);
  // console.log(page,"???page", data)

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
