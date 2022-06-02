import React, { useEffect } from "react";
import styles from "../styles/GeneralComponents/simpleProgress.module.scss";
function SimpleProgress({ questions, current, setcurrent, clr, extrastyle }) {
  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty(
      "--simpleprogress",
      `${((current + 1) / (questions || 15)) * 100}%`
    );
  }, [current]);
  return (
    <div
      className={styles.simpleProgressBarWrapper}
      style={extrastyle ? extrastyle : {}}
    >
      <div className={styles.backgroundbar}></div>
      <div
        className={styles.backgroundprogressbar}
        style={{ backgroundColor: clr }}
      ></div>
    </div>
  );
}

export default SimpleProgress;
