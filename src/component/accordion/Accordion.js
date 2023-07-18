/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from "react";

import "./accordion.css";

const Accordion = ({ title, accordioncontent }) => {
  const [active, setActive] = useState(false);
  const content = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {}, [height]);

  function toggleAccordion() {
    setActive(!active);
    setHeight(active ? "0px" : `${content.current.scrollHeight}px`);
  }

  return (
    <div className="accordion__section">
      <div
        className={`accordion ${active ? "active-accordion" : ""}`}
        onClick={toggleAccordion}>
        <p className="accordion__title">{title}</p>
        <span style={{ marginLeft: "20px" }}>{active ? "-" : "+"}</span>
      </div>
      <div
        ref={content}
        style={{ maxHeight: `${height}` }}
        className="accordion__content">
        <div className="accordion__text">{accordioncontent}</div>
      </div>
    </div>
  );
};

export default Accordion;
