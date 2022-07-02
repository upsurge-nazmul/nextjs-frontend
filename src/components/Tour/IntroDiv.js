import React from "react";
import styles from "../../styles/Dashboard/introdiv.module.scss";
import Jasper from "../SVGcomponents/Jasper";
export default function IntroDiv({ head, name, text, hideJasper }) {
  return (
    <div className={styles.introdiv}>
      <p className={styles.heading}>
        {head ? head : `Welcome to your dashboard,${name}`}
      </p>
      <p className={styles.text}>{text}</p>
      {!hideJasper && <Jasper className={styles.jasper} />}
    </div>
  );
}
