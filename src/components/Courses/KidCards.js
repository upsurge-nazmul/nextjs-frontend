import React from "react";
import styles from "../../styles/Courses/kidCard.module.scss";

function KidCards() {
  return (
    <div className={styles.kidCard}>
      <div className={styles.header}>
        <img
          src="https://images.unsplash.com/photo-1552873816-636e43209957?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGtpZHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
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
