import React from "react";
import styles from "../styles/GeneralComponents/moderninput.module.scss";
import CustomDatePicker from "./CustomDatePicker";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ReactTooltip from "react-tooltip";
import { onlyText } from "../helpers/validationHelpers";
export default function ModernInputBox({
  value,
  setvalue,
  maxLength,
  placeholder,
  extrastyle,
  secure,
  type,
  onFocus,
  onBlur,
  onChange,
  extraclass,
  maxValue,
  placeholderClass,
  numOnly,
  disabled,
  wrapperclassname,
  textOnly,
  tooltip,
  tooltipid,
}) {
  return (
    <div
      className={`${styles.modernInputBox} ${
        type === "date" && styles.modernInputBoxdate
      } ${wrapperclassname && wrapperclassname}`}
      style={extrastyle}
    >
      <p
        className={`${
          value
            ? styles.placeholderlifted
            : type === "date"
            ? styles.dateplaceholder
            : styles.placeholder
        } ${value && placeholderClass}`}
      >
        {placeholder}
      </p>
      {type === "date" ? (
        <CustomDatePicker value={value} setvalue={onChange} onlydate={true} />
      ) : (
        <input
          onBlur={onBlur}
          onFocus={onFocus}
          name="hidden"
          className={`${extraclass ? extraclass : ""}`}
          type={secure ? "password" : "text"}
          value={value}
          autoComplete="off"
          disabled={disabled}
          maxLength={maxLength || 32676}
          onChange={
            onChange
              ? onChange
              : (e) => {
                  if (
                    (maxValue || maxValue === 0) &&
                    Number(e.target.value) > maxValue
                  ) {
                    return;
                  }
                  if (numOnly && isNaN(e.target.value)) {
                    return;
                  }
                  if (textOnly && !onlyText(e.target.value)) {
                    return;
                  }
                  setvalue(e.target.value);
                }
          }
        />
      )}
      {tooltip && (
        <div data-tip data-for={tooltipid} className={styles.tooltip}>
          <InfoOutlinedIcon className={styles.infoicon} />
          <ReactTooltip id={tooltipid} type="dark" effect="solid">
            <p>{tooltip}</p>
          </ReactTooltip>
        </div>
      )}
    </div>
  );
}
