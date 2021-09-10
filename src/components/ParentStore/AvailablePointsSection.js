import React from "react";
import styles from "../../styles/ParentStore/AvailablePointsSection.module.scss";
import HeadingArrow from "../SVGcomponents/HeadingArrow";
import AvailablePointCard from "./AvailablePointCard";

function AvailablePointsSection() {
  const d = ["", "", ""];
  return (
    <div className={styles.AvailablePointsSection}>
      <h2 className={styles.heading}>
        Available Points
        <HeadingArrow />
      </h2>
      <div className={styles.wrapper}>
        {d.map((item, index) => (
          <AvailablePointCard key={"LivAvailablePointCardeClass" + index} />
        ))}
      </div>
    </div>
  );
}

export default AvailablePointsSection;
