import React from "react";
import styles from "../../styles/Careers/jobcomponent.module.scss";
function JobComponent({ data }) {
  return (
    <div className={styles.jobComponent}>
      <div className={styles.left}>
        <p className={styles.title}>{data.title}</p>
        <p className={styles.location}>{data.location}</p>
      </div>
      <div className={styles.button}>Apply</div>
    </div>
  );
}

export default JobComponent;
