import React, { useEffect, useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import styles from "../../styles/levels.module.scss";
import LevelCard from "./LevelCard";

const LEVEL_DATA = [
  {
    level: 1,
    unlockedAt: ["Completed chores <= 1", "Game plays 100"],
    perks: [
      "More Games unlocked",
      "More Quests unlocked",
      "More Avatars unlocked",
    ],
  },
  {
    level: 2,
    unlockedAt: ["Completed chores <= 5", "Game plays 1000"],
    perks: [
      "More Games unlocked",
      "More Quests unlocked",
      "More Avatars unlocked",
    ],
  },
  {
    level: 3,
    unlockedAt: ["Completed chores <= 10", "Game plays 10000"],
    perks: [
      "More Games unlocked",
      "More Quests unlocked",
      "More Avatars unlocked",
    ],
  },
  {
    level: 4,
    unlockedAt: ["Completed chores <= 25", "Game plays 100000"],
    perks: [
      "More Games unlocked",
      "More Quests unlocked",
      "More Avatars unlocked",
    ],
  },
  {
    level: 5,
    unlockedAt: ["Completed chores <= 50", "Game plays 1000000"],
    perks: [
      "More Games unlocked",
      "More Quests unlocked",
      "More Avatars unlocked",
    ],
  },
  {
    level: 6,
    unlockedAt: ["Completed chores <= 75", "Game plays 10000000"],
    perks: [
      "More Games unlocked",
      "More Quests unlocked",
      "More Avatars unlocked",
    ],
  },
  {
    level: 7,
    unlockedAt: ["Completed chores <= 100", "Game plays 10000000"],
    perks: [
      "More Games unlocked",
      "More Quests unlocked",
      "More Avatars unlocked",
    ],
  },
  {
    level: 8,
    unlockedAt: ["Completed chores <= 250", "Game plays 100000000"],
    perks: [
      "More Games unlocked",
      "More Quests unlocked",
      "More Avatars unlocked",
    ],
  },
  {
    level: 9,
    unlockedAt: ["Completed chores <= 500", "Game plays 100000000"],
    perks: [
      "More Games unlocked",
      "More Quests unlocked",
      "More Avatars unlocked",
    ],
  },
  {
    level: 10,
    unlockedAt: ["Completed chores <= 750", "Game plays 100000000"],
    perks: [
      "More Games unlocked",
      "More Quests unlocked",
      "More Avatars unlocked",
    ],
  },
  {
    level: 11,
    unlockedAt: ["Completed chores > 750", "Game plays 1000000000"],
    perks: [
      "More Games unlocked",
      "More Quests unlocked",
      "More Avatars unlocked",
    ],
  },
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
