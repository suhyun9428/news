import { useAtom } from "jotai";
import { useState } from "react";
import { selectedSectionIndexAtom, doesMenuOpenAtom, selectedPageAtom } from "../../atom/atom";

const MenuBarItem = ({data}) => {
  const [, setIndex] = useAtom(selectedSectionIndexAtom);
  const [, setIsMenuOpen] = useAtom(doesMenuOpenAtom);
  const [toggleOpen, setToggleOpen] = useState(
    new Array(data.length).fill(false)
  );
  const [, setPage] = useAtom(selectedPageAtom);

  // const handleToggle = (e, idx) => {
  //   const newToggleOpen = [...toggleOpen];
  //   if (!newToggleOpen[idx]) {
  //     newToggleOpen[idx] = true;
  //     e.target.classList.add("button__toggle-active");
  //   } else {
  //     newToggleOpen[idx] = false;
  //     if (e.target.classList.contains("button__toggle-active")) {
  //       e.target.classList.remove("button__toggle-active");
  //     }
  //   }
  //   setToggleOpen(newToggleOpen);
  // };

  const handleIndex = (e, idx, id) => {
    e.preventDefault();
    setIndex(idx);
    setIsMenuOpen(false);
    // console.log(id,'!!')
    setPage(id);
  };

  return (
    <div className="box__menu">
      {data.map((item, idx) => {
        return (
          <div className="box__menu-wrap" key={idx}>
            <div className="box__menu-inner">
              <a
                href="#"
                className="link__menu"
                onClick={(e) => handleIndex(e, idx, item.id)}
              >
                {item.id}
              </a>
              {/* <button
                type="button"
                className="button__toggle"
                onClick={(e) => {
                  handleToggle(e, idx);
                }}
              >
                <span className="for-a11y">펼치기</span>
              </button> */}
            </div>
            <div
              className={`box__submenu ${
                toggleOpen[idx] ? "box__submenu--active" : ""
              }`}
            >
              {/* <ul className="list__submenu">
                {item.submenu.map((item, idx) => {
                  return (
                    <li key={`item-${idx}`} className="list-item">
                      <a href="#">{item}</a>
                    </li>
                  );
                })}
              </ul> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const MenuBar = ({ data }) => {
  return (
    <div className="box__menubar">
      <MenuBarItem data={data}/>
    </div>
  );
};

export default MenuBar;
