import React from "react";
import image from "../../assets/badges/dustmaster.png";
import styles from "../../styles/kidDashboard/badge.module.scss";
function Badge({ badge }) {
  return (
    <div className={styles.badge}>
      <img className={styles.badgeicon} src={image.src} alt="" />
      <p>Dust Master</p>
    </div>
  );
}

export default Badge;
