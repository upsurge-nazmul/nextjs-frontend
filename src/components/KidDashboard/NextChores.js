import React from "react";
import styles from "../../styles/kidDashboard/nextChores.module.scss";
import ArrowRight from "../SVGcomponents/ArrowRight";
import NextChoreBlockSvg from "../SVGcomponents/NextChoreBlockSvg";
function NextChores() {
  return (
    <div className={styles.nextchores}>
      <NextChoreBlockSvg />
      <div className={styles.text}>
        <p className={styles.next}>NEXT UP</p>
        <p className={styles.star}>Chores Star</p>
        <div className={styles.complete}>
          Complete 20 Chores
          <ArrowRight />
        </div>
      </div>
    </div>
  );
}

export default NextChores;
