import React, { useEffect, useState } from "react";
import styles from "../styles/GeneralComponents/achievement.module.scss";
import { useRouter } from "next/router";
import { use } from "react";

function AchievementPopUp({ setAchievementPopUp,showAchievement }) {
  console.log("Showing")
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      setAchievementPopUp(false);
    },5000);
  },[]);
  return (
    <div className={showAchievement ? styles.achievement: ''}>
      <div className={styles.block}>
        <div className={styles.image}>
          <img
            className={styles.KQImg}
            src="/knowyourmoneythumbnail.png"
            alt="Money 101"
          />
        </div>
        <div className={styles.flexRight}>
        <p className={styles.heading}>{showAchievement.achievementTitle}</p>
        <p className={styles.subheading}>{showAchievement.achievementDescription}</p>
        <p className={styles.text}>Only {showAchievement.percentage}% of players have achieved this achievement</p>
        </div>
      </div>
    </div>
  );
}

export default AchievementPopUp;
