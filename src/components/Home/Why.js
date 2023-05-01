import React from "react";
import styles from "../../styles/Home/why.module.scss";

function Why() {
  return (
    <div className={styles.whySection}>
      <div className={`${styles.doodle} ${styles.dl1}`} />
      <div className={`${styles.doodle} ${styles.dl2}`} />
      <div className={`${styles.doodle} ${styles.dl3}`} />
      <div className={`${styles.doodle} ${styles.dr1}`} />
      <div className={`${styles.doodle} ${styles.dr2}`} />
      <div className={`${styles.doodle} ${styles.dr3}`} />
      <div className={styles.textContent}>
        <p className={styles.heading}>
          <span className={styles.highlight}>
            Why <div className={styles.underline}></div>
          </span>{" "}
          upsurge?
        </p>
        <p className={styles.subheading}>
          Most people start their adult life without knowing a lot about basic
          finance concepts and face challenges doing things like filing taxes or
          planning for retirement.
        </p>
        <div className={styles.subheading}>
          With upsurge, we aim to change that by teaching these concepts at a
          young age through games and challenges the whole family can do
          together.
        </div>
      </div>
    </div>
  );
}

export default Why;
