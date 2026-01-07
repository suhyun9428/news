import HotKeywords from "../Contents/HotKeywords";
import BreakingNews from "../Contents/BreakingNews";
import MainNews from "../Contents/MainNews";
import { useNewsApi } from "../../hooks/useNewsApi";
import { isLoggedInAtom, selectedKeywordAtom } from '../../atom/atom';
import { useAtom } from 'jotai';
import Preferences from "../Contents/Preferences";
import dummyData from "../../dummyData/dummyData";

const GeneralSection = () => {
  const [newKeyword] = useAtom(selectedKeywordAtom);
  const { articles } = useNewsApi("general", newKeyword);
  const [isLoggedin, setIsLoggedin] = useAtom(isLoggedInAtom)
  const breakingArticles = articles.slice(0, 1);
  const mainArticles = articles.slice(1, 4);
  
  return(
    <>
      <HotKeywords />
      <BreakingNews data={breakingArticles} />
      {isLoggedin && <Preferences />}
      <MainNews data={mainArticles} />
    </>
  )
};

export default GeneralSection;
