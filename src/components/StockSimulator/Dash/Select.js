import React, { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/select.module.scss";
import DropDownArrow from "../../SVGcomponents/DropDownArrow";

function DropDown({
  value,
  setvalue,
  options,
  keyprefix,
  placeholder,
  color,
  fontSize,
  margin,
  className,
  shorter,
  onChange,
}) {
  const [showoptions, setshowoptions] = useState(false);
  function handleChange(item) {
    setvalue(item.symbol);
    setshowoptions(false);
  }

  useEffect(() => {
    function getifclickedoutside(e) {
      let elmnt = document.getElementById(
        keyprefix ? keyprefix + "dropdown" : "dropdown" + options[0]
      );
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
      id={keyprefix ? keyprefix + "dropdown" : "dropdown" + options[0]}
      className={`${styles.dropdown} ${className}`}
      style={{ margin: margin ? margin : "0" }}
    >
      <div
        className={styles.selected}
        onClick={() => setshowoptions(!showoptions)}
      >
        <p
          className={`${value ? styles.placeholderlifted : styles.placeholder}`}
        >
          {placeholder}
        </p>
        <p
          className={styles.text}
          style={{
            color: color ? color : "#6d6d6d",
            fontSize: fontSize ? fontSize : "16px",
          }}
        >
          {options.find((option) => option.symbol === value).name}
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
                onClick={() => {
                  console.log(item);
                  handleChange(item);
                }}
                key={
                  keyprefix
                    ? keyprefix + "dropdownoption" + index
                    : "dropdownoption" + index
                }
              >
                {item.name}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DropDown;
