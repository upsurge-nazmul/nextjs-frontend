import React, { useEffect, useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import styles from "../../styles/levels.module.scss";
export default function LevelComponent({ setshow }) {
  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const comp = [1, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1000];
  useEffect(() => {
    const scrollContainer = document.querySelector("#levelwrapper");
    if (!scrollContainer) return;

    scrollContainer.addEventListener("wheel", (evt) => {
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      if (vw > 860) {
        evt.preventDefault();
        scrollContainer.scrollLeft += evt.deltaY * 5;
      }
    });
  }, []);
  return (
    <div className={styles.levels}>
      <div className={styles.background} onClick={() => setshow(false)}></div>
      <div className={styles.cross} onClick={() => setshow(false)}>
        <CancelOutlinedIcon className={styles.icon} />
      </div>
      <div className={styles.main}>
        <p className={styles.heading}>Badge levels</p>
        <div className={styles.flexTop} id="levelwrapper">
          {levels.map((item, index) => {
            return (
              <div className={styles.level} key={"level" + index}>
                <img src={"/images/badges/badge_" + item + ".svg"}></img>
                <p className={styles.levelName}>Level {item}</p>
                <p className={styles.chorecompleted}>{`(completed chores ${
                  index === levels.length - 1 ? ">" : "<="
                } ${comp[index]})`}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
