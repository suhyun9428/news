import { useState } from "react";
import { useAtom } from "jotai";
import {
  selectedKeywordAtom,
  keywordListAtom,
  doesSearchOpenAtom,
} from "../../atom/atom";
import { useNavigate } from "react-router-dom";

const normalize = (str) => str.trim().toLocaleLowerCase(); // trim하고 소문자로 통일

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

    const normalized = normalize(inputVal);
    if(!normalized) return;

    setSearchKeyword(normalized);
    addKeyword(normalized);

    setSearchOpen((prev) => !prev);
    navigate("/issue");
  };

  const addKeyword = (keyword) => {
    const normalized = normalize(keyword);

    if(!normalized || keywordList.includes(normalized)) return;

    setKeywordList([normalized, ...keywordList]);
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
