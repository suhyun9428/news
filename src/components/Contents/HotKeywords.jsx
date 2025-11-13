import { useAtom } from "jotai";
import { selectedKeywordAtom, keywordListAtom } from "../../atom/atom";
import { IoIosClose } from "react-icons/io";

const HotKeywords = ({ data }) => {
  const [newKeyword, setNewKeyword] = useAtom(selectedKeywordAtom);
  const [keywordList, setKeywordList] = useAtom(keywordListAtom);

  const delKeyword = (keyword) => {
    setKeywordList(keywordList.filter((item) => item !== keyword));
  };

  return (
    <>
      {keywordList.length > 0 && (
        <div className="box__recent">
          <p className="for-a11y">최근 검색어</p>
          <ul className="list__recent">
            {keywordList.map((item, idx) => {
              return (
                <li key={`keywordlist-${idx}`} className="list-item">
                  <a
                    href="#"
                    className="link__recent"
                    onClick={() => setNewKeyword(item)}
                  >
                    {item}
                  </a>
                  <button
                    type="button"
                    className="button__close"
                    onClick={() => delKeyword(item)}
                  >
                    <span className="for-a11y">닫기</span>
                    <IoIosClose />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default HotKeywords;
