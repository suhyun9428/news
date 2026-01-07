import { Link, useNavigate } from "react-router-dom";
import { bookmarkAtom } from "../../atom/atom";
import { useAtom } from "jotai";
import { IoCloseOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { useState } from "react";

const ShowInterested = () => {
  const dummyImage = "/image__hi.jpg";
  const [bookmark, setBookmark] = useAtom(bookmarkAtom);
  const someBookmark = Array.from(
    new Map(bookmark.map((item) => [item.url, item])).values()
  );
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [ checkboxList, setCheckboxList ] = useState([]);
  const handleDelete = (e, itemUrl) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log(itemUrl)
    setBookmark(prev =>
      prev.filter(item => item.url !== itemUrl)
    );
  }
  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEdit(!isEdit);
  }

  return (
    <div className="box__interested">
      <div className="box__title">
        <strong className="text__title">Interested</strong>
        <div className="box__edit-wrap">
          <button type="button" className="button__edit" onClick={(e)=>handleEdit(e)}>
            <span className="for-a11y">편집</span>
            <FiEdit3 />
          </button>
          {isEdit && (
            <button
              type="button" 
              className="button__delete"
              onClick={()=>{
                setBookmark(prev =>
                  prev.filter(item => !checkboxList.includes(item.url))
                );
                setCheckboxList([]);
              }}>
              <span className="for-a11y">삭제</span>
              <RiDeleteBinLine />
            </button>
            
          )}
        </div>
      </div>
      <ul className="list__interested">
        {someBookmark.map((item, idx) => {
          const itemUrl = item.url;
          return (
            <li className="list-item" key={`interested-${idx}`}>
              {isEdit && 
                <label htmlFor={`checkbox-${idx}`}>
                  <input
                    type="checkbox"
                    name="checkbox"
                    id={`checkbox-${idx}`}
                    className="form__checkbox"
                    checked={checkboxList.includes(item.url)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCheckboxList(prev => [...prev, item.url]);
                      } else {
                        setCheckboxList(prev =>
                          prev.filter(url => url !== item.url)
                        );
                      }
                    }}
                  />
                </label>
              }
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
                    onError={(e)=>{
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = dummyImage;
                    }}
                  />
                </div>
                <div className="box__info">
                  <p className="text">{item.title}</p>
                </div>
              </Link>
              {!isEdit && 
                <button type="button" className="button__delete" onClick={(e)=>handleDelete(e, itemUrl)}>
                  <span className="for-a11y">삭제</span>
                  <IoCloseOutline className="image"/>
                </button>
              }
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ShowInterested;
