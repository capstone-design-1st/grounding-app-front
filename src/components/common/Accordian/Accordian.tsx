import React, { useState, FunctionComponent } from "react";
import "./styles.css";
import smallArrow from "../../../assets/icons/small-arrow.svg";
import { AccordionItem } from "../../../types";

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: FunctionComponent<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onTitleClick = (index: number): void => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <div className="titleWrapper" onClick={() => onTitleClick(index)}>
            <div className={`title ${index === activeIndex ? "active" : ""}`}>
              {item.title}
            </div>
            <img
              className={`arrowIcon ${index === activeIndex ? "rotated" : ""}`}
              src={smallArrow}
              alt="smallArrow"
            />
          </div>
          <div
            className={`accordionContent ${
              index === activeIndex ? "active" : ""
            }`}
          >
            <p>{item.content}</p>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Accordion;
