import React, { useEffect } from "react";
import styles from "../styles/GeneralComponents/simpleProgress.module.scss";
function SimpleProgress({ questions, current, setcurrent }) {
  useEffect(() => {
    console.log(current);
    const root = document.documentElement;
    root?.style.setProperty(
      "--simpleprogress",
      `${(current + 1 / questions) * 100}%`
    );
  }, [current]);
  return (
    <div className={styles.simpleProgressBarWrapper}>
      <div className={styles.backgroundbar}></div>
      <div className={styles.backgroundprogressbar}></div>
    </div>
  );
}

export default SimpleProgress;
