import React from "react";
import styles from "../styles/GeneralComponents/moderninput.module.scss";
import CustomDatePicker from "./CustomDatePicker";
export default function ModernInputBox({
  value,
  setvalue,
  maxLength,
  placeholder,
  extrastyle,
  secure,
  type,
}) {
  return (
    <div className={styles.modernInputBox} style={extrastyle}>
      <p
        className={`${
          value
            ? styles.placeholderlifted
            : type === "date"
            ? styles.dateplaceholder
            : styles.placeholder
        } `}
      >
        {placeholder}
      </p>
      {type === "date" ? (
        <CustomDatePicker value={value} setvalue={setvalue} onlydate={true} />
      ) : (
        <input
          name="hidden"
          type={secure ? "password" : "text"}
          value={value}
          maxLength={maxLength || 32676}
          onChange={(e) => setvalue(e.target.value)}
        />
      )}
    </div>
  );
}
