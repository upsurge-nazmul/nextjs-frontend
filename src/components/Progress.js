import React, { useEffect } from "react";
import styles from "../styles/GeneralComponents/progress.module.scss";
function Progress({ questions, current, setcurrent }) {
  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty(
      "--progress",
      `${(current / (questions - 1)) * 100}%`
    );
  }, [current]);
  return (
    <div className={styles.progressBarWrapper}>
      <div className={styles.backgroundbar}></div>
      <div className={styles.backgroundprogressbar + " " + styles.grad}></div>
      {Array(questions)
        .fill("")
        .map((item, index) => {
          return (
            <div
              key={"progressquiz" + index}
              className={`${styles.qno} + " " + ${
                index <= current ? styles.completed + " " + styles.grad : ""
              }
              }`}
              onClick={() => setcurrent(index)}
            >
              <p>{index + 1}</p>
            </div>
          );
        })}
    </div>
  );
}

export default Progress;
