import { useAtom } from "jotai";
import {
  selectedSectionIndexAtom,
  selectedKeywordAtom,
  doesSearchOpenAtom,
  selectedPageAtom,
} from "../../atom/atom";
import { useNewsApi } from "../../hooks/useNewsApi";
import { Loading } from "../Loading";
import GeneralSection from "../Section/GeneralSection";
import KeywordSection from "../Section/KeywordSection";
import OpinionSection from "../Section/OpinionSection";
import dummyData from "../../dummyData/dummyData";

const NewsContent = ({ categoryList = dummyData.MenuBar }) => {
  const [index] = useAtom(selectedSectionIndexAtom);
  const [newKeyword] = useAtom(selectedKeywordAtom);
  const [searchOpen, setSearchOpen] = useAtom(doesSearchOpenAtom);
  const [page] = useAtom(selectedPageAtom);
  const { articles, loading } = useNewsApi(
    page?.toLowerCase() || "general",
    newKeyword
  );

  if (loading) return <Loading />;

  return (
    <div className="box__container">
      {index == null ? (
        newKeyword ? (
          <KeywordSection data={articles} />
        ) : (
          <GeneralSection data={articles} />
        )
      ) : (
        <OpinionSection categoryList={categoryList} />
      )}

      {searchOpen && (
        <div
          className="box__dimmed"
          onClick={() => setSearchOpen(false)}
        />
      )}
    </div>
  );
};

export default NewsContent;
