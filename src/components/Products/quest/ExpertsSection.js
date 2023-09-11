import Image from "next/image";
import React from "react";
import styles from "../../../styles/Products/experts.module.scss";

const ExpertsSection = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Brought to you by the experts from</h2>
      <div className={styles.logoContainer}>
        <div className={styles.logoWrap}>
          <Image
            src={"/images/quest/HU_logo.png"}
            layout="fill"
            className={styles.logo}
            alt=" "
          />
        </div>

        <div className={styles.logoWrap}>
          <Image
            src={"/images/quest/IIM_logo.png"}
            layout="fill"
            className={styles.logo}
            alt=" "
          />
        </div>

        <div className={styles.logoWrap}>
          <Image
            src={"/images/quest/ISB_logo.png"}
            layout="fill"
            className={styles.logo}
            alt=" "
          />
        </div>
      </div>
    </div>
  );
};

export default ExpertsSection;
