import React from "react";
import styles from "../../styles/Dashboard/unicoinSummary.module.scss";

const UnicoinsSummary = ({ unicoins }) => {
  return (
    <div className={styles.cover}>
      <p className={styles.heading}>{unicoins}</p>
      <div className={styles.restBlock}>
        <p className={styles.restName}>Earned Unicoins</p>
      </div>
    </div>
  );
};

export default UnicoinsSummary;
