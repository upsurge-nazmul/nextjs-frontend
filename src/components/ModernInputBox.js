import React, { useContext } from "react";
import styles from "../styles/GeneralComponents/moderninput.module.scss";
import CustomDatePicker from "./CustomDatePicker";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ReactTooltip from "react-tooltip";
import { onlyText } from "../helpers/validationHelpers";
import { useState } from "react";
import { capitalize } from "../helpers/generalfunctions";
import { MainContext } from "../context/Main";
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
  suggestions,
  showincaps,
  autoComplete,
  maxDate = "today",
}) {
  const [showsuggestion, setshowsuggestion] = useState(false);
  const { theme } = useContext(MainContext);
  return (
    <div
      className={`${styles.modernInputBox} ${
        type === "date" && styles.modernInputBoxdate
      } ${wrapperclassname && wrapperclassname} ${
        theme === "dark" && styles.darkinputbox
      }`}
      style={extrastyle}
    >
      {showsuggestion ? (
        <div
          className={styles.backgroud}
          onClick={() => setshowsuggestion(false)}
        />
      ) : (
        ""
      )}
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
        <CustomDatePicker
          value={value}
          setvalue={onChange}
          onlydate={true}
          maxdate={maxDate}
        />
      ) : (
        <input
          // onBlur={() => {setTimeout(() => setshowsuggestion(false), 100)}}
          onFocus={
            onFocus
              ? onFocus
              : () => {
                  if (suggestions) setshowsuggestion(true);
                }
          }
          name="hidden"
          className={`${extraclass ? extraclass : ""}`}
          type={secure ? "password" : "text"}
          value={showincaps ? capitalize(value) : value}
          autoComplete={autoComplete ? "on" : "new-password"}
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
                  if (textOnly) {
                    setvalue(onlyText(e.target.value));
                    return;
                  }
                  setvalue(e.target.value.trim());
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
      {showsuggestion && (value || suggestions.length > 0) && (
        <div className={styles.options}>
          {suggestions.map((item) => {
            return (
              <p
                className={styles.option}
                key={item.id}
                onClick={() => {
                  setvalue(item.name);
                  setshowsuggestion(false);
                }}
              >
                {item.name}
              </p>
            );
          })}
          {value && suggestions.length === 0 && (
            <p
              className={styles.option}
              id={"addnewschool"}
              onClick={() => {
                setshowsuggestion(false);
              }}
            >
              {value}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
