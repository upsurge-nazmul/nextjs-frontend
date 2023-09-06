import React, { useState } from "react";
import styles from "../../styles/GeneralComponents/dateInput.module.scss";
import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import moment from "moment";
import range from "lodash/range";
import "react-datepicker/dist/react-datepicker.css";

export default function DateInput({
  label = "",
  value,
  onChange,
  maxDate = "",
  minDate = "",
  onlyDate = true,
  onlyTime = false,
}) {
  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className={styles.dateInput}>
      {label && (
        <label for={label} className={styles.dateLabel}>
          {label}
        </label>
      )}
      {onlyTime ? (
        <DatePicker
          selected={value}
          onChange={(date) => onChange(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="h:mm aa"
          className={styles.datePicker}
        />
      ) : (
        <DatePicker
          showTimeSelect={!onlyDate}
          className={styles.datePicker}
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div
              style={{
                margin: 10,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                {"<"}
              </button>
              <select
                value={getYear(date)}
                onChange={({ target: { value } }) => changeYear(value)}
              >
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select
                value={months[getMonth(date)]}
                onChange={({ target: { value } }) =>
                  changeMonth(months.indexOf(value))
                }
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                {">"}
              </button>
            </div>
          )}
          selected={value}
          onChange={(date) => onChange(date)}
          showFullMonthYearPicker
          allowSameDay={false}
          maxDate={maxDate === "today" ? moment().toDate() : maxDate}
          minDate={minDate === "today" ? moment().toDate() : minDate}
          dateFormat={onlyDate ? "dd/MM/yyyy" : "dd/MM/yyyy h:mm aa"}
        />
      )}
    </div>
  );
}
