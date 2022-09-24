import React from "react";
import styles from "../../styles/Courses/kidCard.module.scss";

function KidCards() {
  return (
    <div className={styles.kidCard}>
      <div className={styles.header}>
        <img
          src="https://imgcdn.upsurge.in/images/unsp/photo-1552873816-636e43209957.avif"
          alt=""
        />
        <div className={styles.text}>
          <p className={styles.name}>Aadvik Mehra</p>
          <p className={styles.points}>5.6K points</p>
        </div>
      </div>
      <div className={styles.coursesCompleted}>
        <span className={styles.imp}>13</span>Courses Completed
      </div>
      <div className={styles.badges}>
        <span className={styles.imp}>12</span>Badges Collected
      </div>
      <div className={styles.xp}>
        <span className={styles.imp}>2.2K</span>XP Collected
      </div>
      <div className={styles.button}>Assign Target</div>
    </div>
  );
}

export default KidCards;
