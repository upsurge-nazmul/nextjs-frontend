import React from "react";
import styles from "../../styles/ParentStore/AvailablePointsSection.module.scss";
import HeadingArrow from "../SVGcomponents/HeadingArrow";
import AvailablePointCard from "./AvailablePointCard";

function AvailablePointsSection({ kidsdata }) {
  return (
    <div className={styles.AvailablePointsSection}>
      <h2 className={styles.heading}>
        Available Points
        <HeadingArrow />
      </h2>
      <div className={styles.wrapper}>
        {kidsdata &&
          kidsdata.map((item, index) => (
            <AvailablePointCard key={item.id} data={item} />
          ))}
      </div>
    </div>
  );
}

export default AvailablePointsSection;
