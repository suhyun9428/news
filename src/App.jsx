import Header from "./components/Header";
import HotKeywords from "./components/HotKeywords";
import BreakingNews from "./components/BreakingNews";
import MainNews from "./components/MainNews";
import dummyData from "./dummyData/dummyData";
import Opinion from "./components/Opinion";
import Column from "./components/Column";
import Issue from "./components/Issue";
import { useAtom } from "jotai";
import {
  selectedSectionIndex,
  selectedKeyword,
  doesSearchOpen,
  selectedPage,
} from "./atom/atom";
import { useNewsApi } from "./hooks/useNewsApi";
import { Loading } from "./components/Loading";

const categoryList = [
  { id: "General", label: "전체", submenu: ["전체"] },
  { id: "World", label: "세계", submenu: ["전체"] },
  { id: "Nation", label: "국가", submenu: ["전체"] },
  { id: "Business", label: "비즈니스", submenu: ["전체"] },
  { id: "Technology", label: "IT/기술", submenu: ["전체"] },
  { id: "Entertainment", label: "연예", submenu: ["전체"] },
  { id: "Sports", label: "스포츠", submenu: ["전체"] },
  { id: "Science", label: "과학", submenu: ["전체"] },
  { id: "Health", label: "건강", submenu: ["전체"] },
];

function App() {
  const [index, setIndex] = useAtom(selectedSectionIndex);
  const [newKeyword, setNewKeyword] = useAtom(selectedKeyword);
  const [searchOpen, setSearchOpen] = useAtom(doesSearchOpen);
  // const { article, loading } = useNewsApi();
  const [page] = useAtom(selectedPage);
  const { articles, loading } = useNewsApi(page || "general");

  return (
    <>
      <Header data={categoryList} />
      {loading ? (
        <Loading />
      ) : (
        <>
          {index == null ? (
            <>
              <HotKeywords data={dummyData.HotKeywords} />
              {newKeyword !== null ? (
                <Issue data={dummyData.Articles} />
              ) : (
                <>
                  <BreakingNews data={articles} />
                  <MainNews data={articles} />
                </>
              )}
            </>
          ) : (
            <>
              <Opinion data={categoryList} />
              <Column data={dummyData.Column} />
            </>
          )}
          {searchOpen && (
            <div
              className="box__dimmed"
              onClick={() => setSearchOpen((prev) => !prev)}
            ></div>
          )}
        </>
      )}
    </>
  );
}

export default App;
