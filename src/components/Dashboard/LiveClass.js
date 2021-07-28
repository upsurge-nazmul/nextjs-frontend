import React from "react";
import styles from "../../styles/Dashboard/liveclass.module.scss";

function LiveClass({ data }) {
  return (
    <div className={styles.liveClass}>
      <img src={data.image} alt="" />
      <div className={styles.classContent}>
        <p className={styles.title}>{data.title}</p>
        <p className={styles.date}>{data.age}</p>
        <p className={styles.assign}>{`Assign Course ->`}</p>
      </div>
    </div>
  );
}

export default LiveClass;
