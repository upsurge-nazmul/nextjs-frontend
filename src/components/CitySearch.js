import React, { useState } from "react";
import styles from "../styles/GeneralComponents/citysearch.module.scss";
import { onlyText } from "../helpers/validationHelpers";
import { Cities_Data } from "../static_data/Cities_Data";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ReactTooltip from "react-tooltip";
export default function CitySearch({
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
  setstate,
}) {
  const [tvalue, settvalue] = useState("");
  const [showdropdown, setshowdropdown] = useState(false);
  const [sortedcities, setsortedcities] = useState([]);
  function sortcities(tvalue) {
    setsortedcities(
      Cities_Data.filter(
        (item) => item.city.toLowerCase().indexOf(tvalue.toLowerCase()) === 0
      )
    );
  }

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
      <input
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
                if (textOnly) {
                  setshowdropdown(true);
                  sortcities(e.target.value);
                  setvalue(onlyText(e.target.value));
                  return;
                }
                setshowdropdown(true);
                sortcities(e.target.value);
                setvalue(e.target.value);
              }
        }
      />
      <div data-tip data-for="info-city" className={styles.tooltip}>
        <InfoOutlinedIcon className={styles.infoicon} />
        <ReactTooltip id="info-city" type="dark" effect="solid">
          <p>City is required to put your child in related circles.</p>
        </ReactTooltip>
      </div>

      {sortedcities?.length > 0 && showdropdown && (
        <div className={styles.options} id={placeholder + "dropdown"}>
          {sortedcities.map((item, index) => {
            return (
              <p
                className={`${styles.option} ${
                  item === value ? styles.selectedOption : null
                }`}
                onClick={() => {
                  setvalue(item.city);
                  setshowdropdown(false);
                  if (setstate) {
                    setstate(item.state);
                  }
                }}
                key={item}
              >
                {item.city}, {item.state}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}
