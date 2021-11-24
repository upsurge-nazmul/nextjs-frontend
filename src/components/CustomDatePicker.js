import React from "react";
import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";
import "react-datepicker/dist/react-datepicker.css";
const years = range(1990, getYear(new Date()) + 5, 1);
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
export default function CustomDatePicker({ value, setvalue, onlydate }) {
  return (
    <div>
      {onlydate ? (
        <DatePicker
          selected={value}
          onChange={(date) => setvalue(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
      ) : (
        <DatePicker
          showTimeSelect
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
                margin: "5px 10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                style={{
                  backgroundColor: "white",
                  border: "none",
                  width: "30px",
                  height: "30px",
                  borderRadius: "5px",
                }}
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                {"<"}
              </button>
              <select
                style={{
                  backgroundColor: "white",
                  border: "none",
                  height: "30px",
                  borderRadius: "5px",
                }}
                value={date.getFullYear()}
                onChange={({ target: { value } }) => changeYear(value)}
              >
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select
                style={{
                  backgroundColor: "white",
                  border: "none",
                  height: "30px",
                  borderRadius: "5px",
                }}
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
                style={{
                  backgroundColor: "white",
                  border: "none",
                  width: "30px",
                  height: "30px",
                  borderRadius: "5px",
                }}
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                {">"}
              </button>
            </div>
          )}
          selected={value}
          showFullMonthYearPicker
          allowSameDay={false}
          onChange={(date) => {
            setvalue(date);
          }}
          dateFormat="dd/MM/yyyy h:mm aa"
        />
      )}
    </div>
  );
}
