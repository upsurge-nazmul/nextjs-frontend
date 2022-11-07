import React, { useEffect, useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import styles from "../../styles/levels.module.scss";
import LevelCard from "./LevelCard";

const LEVEL_DATA = [
  { level: 1 },
  { level: 2 },
  { level: 3 },
  { level: 4 },
  { level: 5 },
  { level: 6 },
  { level: 7 },
  { level: 8 },
  { level: 9 },
  { level: 10 },
  { level: 11 },
];

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
          {/* {levels.map((item, index) => {
            return (
              <div className={styles.level} key={"level" + index}>
                <img
                  src={"/images/badges/badge_" + item + ".svg"}
                  alt="Badge"
                ></img>
                <p className={styles.levelName}>Level {item}</p>
                <p className={styles.chorecompleted}>{`(completed chores ${
                  index === levels.length - 1 ? ">" : "<="
                } ${comp[index]})`}</p>
              </div>
            );
          })} */}
          {LEVEL_DATA.map((level) => (
            <LevelCard key={level.level} data={level} />
          ))}
        </div>
      </div>
    </div>
  );
}
