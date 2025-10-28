import { useAtom } from "jotai";
import {
  selectedSectionIndexAtom,
  selectedKeywordAtom,
  selectedPageAtom,
} from "../../atom/atom";
import { useNewsApi } from "../../hooks/useNewsApi";
import { Loading } from "../Loading";
import GeneralSection from "../sections/GeneralSection";
import KeywordSection from "../sections/KeywordSection";
import OpinionSection from "../sections/OpinionSection";

const NewsContainer = ({ categoryList }) => {
  const [index] = useAtom(selectedSectionIndexAtom);
  const [keyword] = useAtom(selectedKeywordAtom);
  const [page] = useAtom(selectedPageAtom);

  const { articles, loading } = useNewsApi(page?.toLowerCase() || "general", keyword);

  if (loading) return <Loading />;

  return (
    <>
      {index == null ? (
        keyword ? (
          <KeywordSection data={articles} />
        ) : (
          <GeneralSection data={articles} />
        )
      ) : (
        <OpinionSection categoryList={categoryList} />
      )}
    </>
  );
};

export default NewsContainer;
