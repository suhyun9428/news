import { useAtom } from "jotai";
import { useState } from "react";
import { selectedSectionIndex } from "../atom/atom";

const CategoryHeader = ({ data = [] }) => {
  const [index, setIndex] = useAtom(selectedSectionIndex);
  const [selected, setSelected] = useState(0);

  if (!data[index]) return null;

  const section = data[index];

  return (
    <div className="box__category-wrap">
      <h2 className="text__title">{section.id}</h2>
      <ul className="list__sub-category">
        {Array.isArray(section.submenu) &&
          section.submenu.map((item, idx) => (
            <li key={idx} className="list-item">
              <a
                href="#"
                className={`link__category ${
                  idx === selected ? "link__category--selected" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setSelected(idx);
                }}
              >
                {item}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default CategoryHeader;