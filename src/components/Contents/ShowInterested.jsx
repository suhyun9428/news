import { Link, useNavigate } from "react-router-dom";
import { bookmarkAtom } from "../../atom/atom";
import { useAtom } from "jotai";
import { IoCloseOutline } from "react-icons/io5";
import { FiEdit3 } from "react-icons/fi";

const ShowInterested = () => {
  const [bookmark, setBookmark] = useAtom(bookmarkAtom);
  const someBookmark = Array.from(
    new Map(bookmark.map((item) => [item.url, item])).values()
  );
  const navigate = useNavigate();
  const handleDelete = (e, itemUrl) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(itemUrl)
    setBookmark(prev =>
      prev.filter(item => item.url !== itemUrl)
  );
  }
  return (
    <div className="box__interested">
      <div className="box__title">
        <h2 className="text__title">Interested</h2>
        <button type="button" className="button__edit">
          <span className="for-a11y">편집</span>
          <FiEdit3 />
        </button>
      </div>
      <ul className="list__interested">
        {someBookmark.map((item, idx) => {
          const itemUrl = item.url;
          return (
            <li className="list-item" key={`interested-${idx}`}>
              <Link 
                className="link__news"
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
                        title: item.title,
                        content: item.content,
                        image: item.image,
                        url: item.url,
                      },
                    });
                  }
                }}
              >
                <div className="box__image">
                  <img
                    className="image"
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                </div>
                <div className="box__info">
                  <p className="text">{item.title}</p>
                </div>
              </Link>
              <button type="button" className="button__delete" onClick={(e)=>handleDelete(e, itemUrl)}>
                <span className="for-a11y">삭제</span>
                <IoCloseOutline className="image"/>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ShowInterested;
