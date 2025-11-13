import { useState } from "react";
import { useAtom } from "jotai";
import {
  selectedKeywordAtom,
  keywordListAtom,
  doesSearchOpenAtom,
} from "../../atom/atom";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [inputVal, setInputVal] = useState("");
  const [searchKeyword, setSearchKeyword] = useAtom(selectedKeywordAtom);
  const [keywordList, setKeywordList] = useAtom(keywordListAtom);
  const [searchOpen, setSearchOpen] = useAtom(doesSearchOpenAtom);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputVal.trim();
    const lowerValue = value.toLocaleLowerCase()
    // console.log(value,'trim만 한 상태')
    setSearchKeyword(lowerValue);
    // console.log(lowerValue, 'val 소문자로');
    addKeyword(lowerValue);
    setSearchOpen((prev) => !prev);
    navigate("/issue");
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
