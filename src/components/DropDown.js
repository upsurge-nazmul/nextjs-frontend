import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/Main";
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
  presign,
  postsign,
  className,
  shorter,
  onChange,
  id,
}) {
  const { theme } = useContext(MainContext);
  const [showoptions, setshowoptions] = useState(false);
  function handleChange(item) {
    setvalue(item);
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
      id={
        id ? id : keyprefix ? keyprefix + "dropdown" : "dropdown" + options[0]
      }
      className={`${styles.dropdown} ${className} ${
        theme === "dark" && styles.darkstyles
      }`}
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
          {presign ? presign : ""}
          {shorter && value >= 1000
            ? value / 1000 + "K"
            : value?.length > 25
            ? value.substring(0, 25) + "..."
            : value}
          {postsign ? " " + postsign : ""}
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
                {shorter ? (item >= 1000 ? item / 1000 + "K" : item) : item}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DropDown;
