import React from "react";
import styles from "../../styles/Calculators/bigcalcinput.module.scss";
import DropDown from "../DropDown";
export default function BigCalcDropdown({
  title,
  value,
  setvalue,
  options,
  keyprefix,
  placeholder,
  code,
}) {
  return (
    <div className={styles.bigcalcinput}>
      <p className={styles.heading}>{title}</p>
      <div className={styles.inputwrapper}>
        <DropDown
          color="black"
          fontSize="30px"
          bold
          value={value}
          setvalue={(e) => setvalue((prev) => ({ ...prev, [code]: e }))}
          options={options}
          keyprefix={keyprefix}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
