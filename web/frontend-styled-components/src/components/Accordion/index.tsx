import React, { FunctionComponent, useState, useRef } from "react";
import Chevron from "./chevron";

import "./index.css";


export const Accordion: FunctionComponent<any> = ({children, title}) => {

    const [setActive, setActiveState] = useState("");
    const [setHeight, setHeightState] = useState("0px");
    const [setRotate, setRotateState] = useState("accordion__icon");
  
    const content = useRef(children);
  
    function toggleAccordion() {
      setActiveState(setActive === "" ? "active" : "");
      setHeightState(
        setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
      );
      setRotateState(
        setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
      );
    }
  
    return (
      <div className="accordion__section">
        <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
          <p className="accordion__title">{title}</p>
          <Chevron className={`${setRotate}`} width={10} fill={"#777"} />
        </button>
        <div
          ref={content}
          style={{ maxHeight: `${setHeight}` }}
          className="accordion__content"
        >
          {children}
        </div>
      </div>
    );
  }
  
  export default Accordion;