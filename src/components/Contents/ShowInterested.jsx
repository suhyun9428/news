import { bookmarkAtom } from "../../atom/atom";
import { useAtom } from "jotai";

const ShowInterested = () => {
  const [bookmark, setBookmark] = useAtom(bookmarkAtom);
  const someBookmark = Array.from(
    new Map(bookmark.map((item) => [item.url, item])).values()
  )
  console.log("isInterest", bookmark, someBookmark);

  return (
    <div className="box__interested">
      <h2 className="text__title">Interested</h2>
      <ul className="list__interested">
        {someBookmark.map((item, idx) => {
          return (
            <li className="list-item" key={`interested-${idx}`}>
              <a href={item.url} className="link__news">
                <div className="box__image">
                  <img className="image" src={item.image} alt={item.title} />
                </div>
                <div className="box__info">
                  <p className="text">{item.title}</p>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ShowInterested;
