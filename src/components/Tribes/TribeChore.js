import React from "react";
import { getRelativeTime } from "../../helpers/timehelpers";
import styles from "../../styles/Tribes/tribechore.module.scss";
function TribeChore({ data, memberdata }) {
  console.log(data);
  return (
    <div className={styles.tribeChore}>
      <div className={styles.left}>
        <img
          src={
            memberdata[
              memberdata.findIndex((item) => item.id === data.child_id)
            ]?.user_img_url
          }
          alt=""
        />
      </div>
      <div className={styles.mid}>
        <p className={styles.name}>{data.assigned_to + " "}</p>
        <p className={styles.data}>Completed his chore : {data.title}</p>
      </div>
      <p className={styles.time}>{getRelativeTime(data.completed_at)}</p>
    </div>
  );
}

export default TribeChore;
