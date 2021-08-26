import React from "react";
import styles from "../../styles/kidDashboard/tribeSection.module.scss";
import HeadingArrow from "../SVGcomponents/HeadingArrow";
import Tribe from "./Tribe";
function TribeSection({ tribes }) {
  return (
    <div className={styles.tribeSection}>
      <h2 className={styles.heading}>
        My Tribes
        <HeadingArrow />
      </h2>

      <div className={styles.wrapper}>
        {tribes.map((tribe, index) => {
          return <Tribe data={tribe} key={"tribe" + index} />;
        })}
      </div>
    </div>
  );
}

export default TribeSection;
