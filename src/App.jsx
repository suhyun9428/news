import Header from "./components/Header";
import HotKeywords from "./components/HotKeywords";
import BreakingNews from "./components/BreakingNews";
import MainNews from "./components/MainNews";
import dummyData from "./dummyData/dummyData";
import Opinion from "./components/Opinion";
import Column from "./components/Column";
import { useAtom } from "jotai";
import { selectedSectionIndex } from "./atom/atom";

function App() {
  const [index, setIndex] = useAtom(selectedSectionIndex);
  return (
    <>
      <Header />
      {index == null ? (
        <>
          <HotKeywords data={dummyData.HotKeywords} />
          <BreakingNews data={dummyData.BreakingNews} />
          <MainNews data={dummyData.MainNews} />
        </>
      ) : (
        <>
          <Opinion />
          <Column data={dummyData.Column} />
        </>
      )}
    </>
  );
}

export default App;
