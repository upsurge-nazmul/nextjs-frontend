import { useEffect } from "react";
import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/Leaderboard/monthInput.module.scss";

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <div className={styles.customInput} onClick={onClick} ref={ref}>
    {value}
  </div>
));

export default function MonthInput({ selectedDate, setSelectedDate }) {
  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  useEffect(() => {
    return () => {
      setSelectedDate();
    };
  }, []);

  return (
    <div className={styles.monthInput}>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
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
