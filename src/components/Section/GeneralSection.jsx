import HotKeywords from "../Contents/HotKeywords";
import BreakingNews from "../Contents/BreakingNews";
import MainNews from "../Contents/MainNews";
import { useNewsApi } from "../../hooks/useNewsApi";
import { selectedKeywordAtom } from '../../atom/atom';
import { useAtom } from 'jotai';

const GeneralSection = () => {
  const [newKeyword] = useAtom(selectedKeywordAtom);
  const { articles } = useNewsApi("general", newKeyword);
  const breakingArticles = articles.slice(0, 2);
  const mainArticles = articles.slice(2, 6);
  
  return(
    <>
      <HotKeywords />
      <BreakingNews data={breakingArticles} />
      <MainNews data={mainArticles} />
    </>
  )
};

export default GeneralSection;
