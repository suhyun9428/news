import { useState } from "react";
import { useAtom } from "jotai";
import { selectedKeywordAtom } from "../atom/atom";

const SearchBar = () => {
  const [inputVal, setInputVal] = useState("");
  const [, setSearchKeyword] = useAtom(selectedKeywordAtom);

  const handleChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchKeyword(inputVal.trim());
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
