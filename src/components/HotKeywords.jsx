import { useAtom } from "jotai";
import { selectedKeywordAtom } from "../atom/atom";

const HotKeywords = ({ data }) => {
  const [, setNewKeyword] = useAtom(selectedKeywordAtom);

  return (
    <div className="box__recent">
      <p className="for-a11y">최근 이슈</p>
      <ul className="list__recent">
        {data.map((item, idx) => {
          return (
            <li key={idx} className="list-item">
              <a
                href="#"
                className="link__recent"
                onClick={() => setNewKeyword(item)}
              >
                {item}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HotKeywords;
