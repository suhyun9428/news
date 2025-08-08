import { useAtom } from "jotai";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { selectedSectionIndex } from "../atom/atom";

const CategoryHeader = ({ data }) => {
  const [index, setIndex] = useAtom(selectedSectionIndex);
  const [selected, setSelected] = useState(0);

  const handleIndex = (e, idx) => {
    e.preventDefault();
    setSelected(idx);
  };

  return (
    <div className="box__category-wrap">
      {data.map((item, idx) => {
        return (
          idx === index && (
            <Fragment key={`item=${idx}`}>
              <h2 className="text__title">{item.title}</h2>
              <ul className="list__sub-category">
                {item.submenu.map((item, idx) => {
                  return (
                    <li key={`item-${idx}`} className="list-item">
                      <a
                        href="#"
                        className={`link__category ${
                          idx === selected ? "link__category--selected" : ""
                        }`}
                        onClick={(e) => {
                          handleIndex(e, idx);
                        }}
                      >
                        <span className="text">{item}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Fragment>
          )
        );
      })}
    </div>
  );
};

export default CategoryHeader;
