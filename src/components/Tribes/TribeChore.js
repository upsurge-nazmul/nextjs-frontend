import React from "react";
import { getRelativeTime } from "../../helpers/timehelpers";
import styles from "../../styles/Tribes/tribechore.module.scss";
function TribeChore({ data }) {
  return (
    <div className={styles.tribeChore}>
      {/* <img src={data.img_url} alt="" /> */}
      <div className={styles.right}>
        <div className={styles.choredes}>
          <span className={styles.name}>{data.assigned_to + " "}</span>
          <p>completed his chore</p>
          <span className={styles.choretitle}>{data.title}</span>
          <p>{getRelativeTime(data.completed_at)}</p>
        </div>
        {/* <p className={styles.time}>{getRelativeTime(data.completed_at)}</p> */}
      </div>
    </div>
  );
}

export default TribeChore;
