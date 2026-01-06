import { useAtom } from "jotai";
import { selectedPageAtom } from "../../atom/atom";
import { useNewsApi } from "../../hooks/useNewsApi";
import NewsList from "./NewsList";

const CategorySection = () => {
  const [page] = useAtom(selectedPageAtom);
  const { articles } = useNewsApi(page);

  return (
    <div className="box__category-contents">
      <div className="box__inner">
        <ul className="list__articles">
          {articles.map((item, idx) => {
            return (
              <li className="list-item" key={`item-${idx}`}>
                <div className="box__card">
                  <NewsList data={item} />
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
