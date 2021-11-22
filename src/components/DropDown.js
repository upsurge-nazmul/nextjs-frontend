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
  margin,
}) {
  const [showoptions, setshowoptions] = useState(false);
  function handleChange(item) {
    setvalue(item);
    setshowoptions(false);
  }

  useEffect(() => {
    function getifclickedoutside(e) {
      let elmnt = document.getElementById("dropdown" + options[0]);
      if (elmnt !== null && !elmnt.contains(e.target)) {
        setshowoptions(false);
      }
    }
    document.addEventListener("mousedown", getifclickedoutside);
    return () => {
      document.removeEventListener("mousedown", getifclickedoutside);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div
      id={"dropdown" + options[0]}
      className={styles.dropdown}
      style={{ margin: margin ? margin : "0" }}
    >
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
          {value?.length > 25
            ? value.substring(0, 25) + "..."
            : value || placeholder}
        </p>
        <DropDownArrow className={styles.svg} />
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
