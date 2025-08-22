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
} from "./atom/atom";

function App() {
  const [index, setIndex] = useAtom(selectedSectionIndex);
  const [newKeyword, setNewKeyword] = useAtom(selectedKeyword);
  const [searchOpen, setSearchOpen] = useAtom(doesSearchOpen);

  return (
    <>
      <Header />
      {index == null ? (
        <>
          <HotKeywords data={dummyData.HotKeywords} />
          {newKeyword !== null ? (
            <Issue data={dummyData.Articles} />
          ) : (
            <>
              <BreakingNews data={dummyData.BreakingNews} />
              <MainNews data={dummyData.MainNews} />
            </>
          )}
        </>
      ) : (
        <>
          <Opinion />
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
  );
}

export default App;
