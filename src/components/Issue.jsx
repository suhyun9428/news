import { useAtom } from "jotai";
import { selectedKeyword } from "../atom/atom";

const Issue = () => {
  const [newKeyword, setNewKeyword] = useAtom(selectedKeyword);

  return (
    <div className="box__issue">
      <h3 className="text__title">이슈</h3>
      <p className="text__issue">{newKeyword}</p>
    </div>
  );
};
export default Issue;
