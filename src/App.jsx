import Header from "./components/Header";
import HotKeywords from "./components/HotKeywords";
import BreakingNews from "./components/BreakingNews";
import MainNews from "./components/MainNews";
import dummyData from "./dummyData/dummyData";
import Opinion from "./components/Opinion";
import Column from "./components/Column";
import Issue from "./components/Issue";
import MischiefPopup from "./components/MischiefPopup";
import { useAtom } from "jotai";
import {
  selectedSectionIndexAtom,
  selectedKeywordAtom,
  doesSearchOpenAtom,
  selectedPageAtom,
  mischiefPopupAtom,
} from "./atom/atom";
import { useNewsApi } from "./hooks/useNewsApi";
import { Loading } from "./components/Loading";

const categoryList = [
  { id: "General", label: "전체" },
  { id: "World", label: "세계" },
  { id: "Nation", label: "국가" },
  { id: "Business", label: "비즈니스" },
  { id: "Technology", label: "IT/기술" },
  { id: "Entertainment", label: "연예" },
  { id: "Sports", label: "스포츠" },
  { id: "Science", label: "과학" },
  { id: "Health", label: "건강" },
];

function App() {
  const [index, ] = useAtom(selectedSectionIndexAtom);
  const [newKeyword, ] = useAtom(selectedKeywordAtom);
  const [searchOpen, setSearchOpen] = useAtom(doesSearchOpenAtom);
  const [page] = useAtom(selectedPageAtom);
  const { articles, loading } = useNewsApi(page?.toLowerCase() || "general", newKeyword);
  const [isOpen, ] = useAtom(mischiefPopupAtom);
  // console.log("내 페이지의 오리진은? ", location.origin);
  console.log("해킹당했어? ", isOpen, '지금 카테고리 : ', page);

  return (
    <>
      <Header data={categoryList} />
      {/* 여기 내부 SearchBar에서 검색 */}
      <div className="box__container">
        {loading ? (
          <Loading />
        ) : (
          <>
            {index == null ? (
              <>
                <HotKeywords data={dummyData.HotKeywords} />
                {newKeyword !== null ? (
                  <Issue data={articles} /> // 여기서 검색된 뉴스 페이지 노출
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
      </div>
      {isOpen && <MischiefPopup />}
    </>
  );
}

export default App;
