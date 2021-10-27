import React, { useEffect, useState } from "react";
import styles from "../styles/GeneralComponents/dropdown.module.scss";
import DropDownArrow from "./SVGcomponents/DropDownArrow";
function DropDown({
  value,
  setvalue,
  options,
  keyprefix,
  placeholder,
  color,
  fontSize,
  bold,
}) {
  const [showoptions, setshowoptions] = useState(false);
  function handleChange(item) {
    setvalue(item);
    setshowoptions(false);
  }
  return (
    <div className={styles.dropdown}>
      <div
        className={styles.selected}
        onClick={() => setshowoptions(!showoptions)}
      >
        <p
          className={styles.text}
          style={{
            color: color ? color : "#6d6d6d",
            fontSize: fontSize ? fontSize : "16px",
          }}
        >
          {value || placeholder}
        </p>
        <DropDownArrow />
      </div>
      {showoptions && (
        <div className={styles.options} id={placeholder + "dropdown"}>
          {options.map((item, index) => {
            return (
              <p
                className={`${styles.option} ${
                  item === value ? styles.selectedOption : null
                }`}
                onClick={() => handleChange(item)}
                key={
                  keyprefix
                    ? keyprefix + "dropdownoption" + index
                    : "dropdownoption" + index
                }
              >
                {item}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DropDown;
