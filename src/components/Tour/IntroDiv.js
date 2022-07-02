import React from "react";
import styles from "../../styles/Dashboard/introdiv.module.scss";
import Jasper from "../SVGcomponents/Jasper";
export default function IntroDiv({ name, text }) {
  return (
    <div className={styles.introdiv}>
      <p className={styles.heading}>Welcome to your dashboard,{name}</p>
      <p className={styles.text}>{text}</p>
      <Jasper className={styles.jasper} />
    </div>
  );
}
