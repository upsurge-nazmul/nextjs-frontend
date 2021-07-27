import React from "react";
import img1 from "../../assets/how/1.png";
import styles from "../../styles/Home/how.module.scss";

function How() {
  return (
    <div className={styles.howSection}>
      <div className={styles.heading}>
        How it{" "}
        <span className={styles.highlight}>
          works <div className={styles.underline}></div>{" "}
        </span>
      </div>
      <div className={styles.middle}>
        <div className={styles.left}>
          <div className={styles.circle}>
            <img src={img1.src} alt="" />
            <div className={styles.blue}></div>
            <div className={styles.green}></div>
            <div className={styles.yellow}></div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.head}>
            <span className={styles.highlight}>Gamified</span> Learning
          </div>
          <p className={styles.details}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            integer tincidunt tincidunt habitasse non. Bibendum quisque est
            pharetra id.
          </p>
          <p className={styles.details}>
            Eu pellentesque fames ultrices libero, mauris ac, adipiscing
            feugiat. Molestie risus consequat massa egestas et.
          </p>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={`${styles.dot} ${styles.current}`}></div>
      </div>
    </div>
  );
}

export default How;
