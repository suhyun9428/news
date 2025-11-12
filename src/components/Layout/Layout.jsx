import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import TopButton from "./TopButton";
import MischiefPopup from "../Popup/MischiefPopup";
import { mischiefPopupAtom, doesMenuOpenAtom } from "../../atom/atom";
import { useAtom } from "jotai";

const Layout = () => {
  const [isOpen] = useAtom(mischiefPopupAtom);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <TopButton />
      {isOpen && <MischiefPopup />}
    </>
  );
};

export default Layout;
