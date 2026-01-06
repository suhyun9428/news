import { useAtom } from "jotai";
import { selectedSectionIndexAtom, doesMenuOpenAtom, selectedPageAtom, isDarkModeAtom } from "../../atom/atom";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const MenuBarItem = ({ data }) => {
  const [, setIndex] = useAtom(selectedSectionIndexAtom);
  const [, setIsMenuOpen] = useAtom(doesMenuOpenAtom);
  const [isDarkMode, ] = useAtom(isDarkModeAtom);
  
  const fillColor = isDarkMode ? "#fff" : "#000";
  const [, setPage] = useAtom(selectedPageAtom);
  const navigate = useNavigate();

  const handleIndex = (e, idx, id) => {
    e.preventDefault();
    setIndex(idx);
    setIsMenuOpen(false);
    setPage(id);
    navigate("/");
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
                <FaPlus className="image" style={{ color: fillColor }}/>
              </a>
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
      <MenuBarItem data={data} />
    </div>
  );
};

export default MenuBar;
