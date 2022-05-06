import React from "react";
import styles from "../../styles/MoneyAce/datacomp.module.scss";
export default function DataComponent({
  icon,
  title,
  value,
  isRange,
  customClass,
}) {
  return (
    <div className={styles.datacomp}>
      <p className={styles.heading}>{title}</p>
      <div className={styles.bg}>
        <img src={icon} alt="" />
        {isRange && (
          <div className={styles.range} style={{ width: `${value}%` }} />
        )}
        <p className={styles.value}>
          {value}
          {isRange && "%"}
        </p>
      </div>
    </div>
  );
}
