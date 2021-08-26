import React from "react";
import styles from "../../styles/kidDashboard/badgeSection.module.scss";
import HeadingArrow from "../SVGcomponents/HeadingArrow";
import Badge from "./Badge";
function BadgeSection({ badges }) {
  return (
    <div className={styles.badgeSection}>
      <h2 className={styles.heading}>
        My Badges
        <HeadingArrow />
      </h2>

      <div className={styles.wrapper}>
        {badges.map((badge, index) => {
          return <Badge data={badge} key={"badge" + index} />;
        })}
      </div>
    </div>
  );
}

export default BadgeSection;
