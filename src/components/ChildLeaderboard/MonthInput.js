import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/Leaderboard/monthInput.module.scss";

const CustomInput = ({ value, onClick }) => (
  <div className={styles.customInput} onClick={onClick}>
    {value}
  </div>
);

export default function MonthInput() {
  const [currentDate, setCurrentDate] = useState(new Date());

  //   console.log("**********", currentDate);

  return (
    <div className={styles.monthInput}>
      <DatePicker
        selected={currentDate}
        onChange={(date) => setCurrentDate(date)}
        dateFormat={"MMMM yyyy"}
        // dateFormatCalendar={"LLLL yyyy"}
        // showMonthDropdown={true}
        // showYearDropdown={true}
        // scrollableYearDropdown
        showMonthYearPicker={true}
        // showFullMonthYearPicker={true}
        customInput={<CustomInput />}
      />
    </div>
  );
}
