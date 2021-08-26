import React, { useState } from "react";
import styles from "../styles/GeneralComponents/dropdown.module.scss";
import DropDownArrow from "./SVGcomponents/DropDownArrow";
function DropDown({ value, setvalue, options, keyprefix, placeholder }) {
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
        <p className="text">{value}</p>
        <DropDownArrow />
      </div>
      {showoptions && (
        <div className={styles.options}>
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
