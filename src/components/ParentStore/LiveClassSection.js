import React from "react";
import LiveClass from "./LiveClass";
import styles from "../../styles/ParentStore/liveClassSections.module.scss";
import HeadingArrow from "../SVGcomponents/HeadingArrow";

function LiveClassSection() {
  const d = ["", "", ""];
  return (
    <div className={styles.liveClassSection}>
      <h2 className={styles.heading}>
        Available Live Classes
        <HeadingArrow />
      </h2>
      <div className={styles.wrapper}>
        {d.map((item) => (
          <LiveClass />
        ))}
      </div>
    </div>
  );
}

export default LiveClassSection;
