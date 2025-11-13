import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import TopButton from "./TopButton";
import MischiefPopup from "../Popup/MischiefPopup";
import { mischiefPopupAtom, doesSearchOpenAtom } from "../../atom/atom";
import { useAtom } from "jotai";

const Layout = () => {
  const [isOpen] = useAtom(mischiefPopupAtom);
  const [searchOpen, setSearchOpen] = useAtom(doesSearchOpenAtom);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <TopButton />
      {searchOpen && (
        <div className="box__dimmed" onClick={() => setSearchOpen(false)} />
      )}
      {isOpen && <MischiefPopup />}
    </>
  );
};

export default Layout;
