import React, { useContext } from "react";
import { MainContext } from "../../context/Main";
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
  const { theme } = useContext(MainContext);
  return (
    <div
      className={`${styles.bigcalcinput} ${
        theme === "dark" && styles.darkstyles
      }`}
    >
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
