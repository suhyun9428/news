import { useAtom } from "jotai";
import { selectedKeywordAtom, keywordListAtom, isDarkModeAtom, newsCacheAtom } from "../../atom/atom";
import { IoIosClose } from "react-icons/io";

const normalize = (str) => str.trim().toLocaleLowerCase(); 
// trim하고 소문자로 통일

const HotKeywords = () => {
  const [, setNewKeyword] = useAtom(selectedKeywordAtom);
  const [keywordList, setKeywordList] = useAtom(keywordListAtom);
  const [newCache] = useAtom(newsCacheAtom);
  const [isDarkMode, ] = useAtom(isDarkModeAtom);
  const fillColor = isDarkMode ? "#fff" : "#000";

  const hotKeywordsList = Object.keys(newCache).filter((key)=> !key.startsWith('category-'));
  const delKeyword = (keyword) => {
    const normalized = normalize(keyword);
    setKeywordList(keywordList.filter((item) => item !== normalized));
  };

  return (
    <>
      {hotKeywordsList.length > 0 && (
        <div className="box__recent">
          <p className="for-a11y">최근 검색어</p>
          <ul className="list__recent">
            {hotKeywordsList.map((item, idx) => {
              return (
                <li key={`hotKeywordsList-${idx}`} className="list-item">
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
                    <IoIosClose
                      className="image"
                      style={{ color: fillColor }}
                    />
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
