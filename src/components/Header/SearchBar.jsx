import { useState } from "react";
import { useAtom } from "jotai";
import { selectedKeywordAtom, keywordListAtom, doesSearchOpenAtom } from "../../atom/atom";

const SearchBar = () => {
  const [inputVal, setInputVal] = useState("");
  const [searchKeyword, setSearchKeyword] = useAtom(selectedKeywordAtom);
  const [keywordList, setKeywordList] = useAtom(keywordListAtom);
  const [searchOpen, setSearchOpen] = useAtom(doesSearchOpenAtom);

  const handleChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    setSearchKeyword(inputVal.trim());
    addKeyword(inputVal.trim());
    // console.log(inputVal)
    setSearchOpen((prev) => !prev)
  };

  const addKeyword = (searchKeyword) => {
    if (!searchKeyword || keywordList.includes(searchKeyword)) return;
    setKeywordList([searchKeyword, ...keywordList]);
  };

  return (
    <form className="box__search-bar" onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          placeholder="뉴스 검색"
          className="form__keyword"
          value={inputVal}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className="button__confirm">
        검색
      </button>
    </form>
  );
};

export default SearchBar;
