import React from "react";
import styles from "../../styles/kidDashboard/badge.module.scss";
function Badge({ badge }) {
  return (
    <div className={styles.badge}>
      <img
        className={styles.badgeicon}
        src={badge || "/images/badges/dustmaster.png"}
        alt=""
      />
      <p>Dust Master</p>
    </div>
  );
}

export default Badge;
