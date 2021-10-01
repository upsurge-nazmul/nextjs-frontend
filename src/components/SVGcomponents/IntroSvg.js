import React from "react";
import styles from "../../styles/GeneralComponents/intro.module.scss";
export default function IntroSvg({ className, onClick, clr }) {
  return (
    <div className={styles.intro}>
      <div className={styles.background}></div>
      <img
        className={styles.dashboard}
        src="/images/home/dashboard.png"
        alt=""
      />
      <img className={styles.phone} src="/images/home/phone.png" alt="" />
      <img className={styles.card1} src="/images/home/Card 1.png" alt="" />
      <img className={styles.card2} src="/images/home/Card 2.png" alt="" />
    </div>
  );
}
