import React from "react";
import styles from "../../styles/ManageChore/assignees.module.scss";

function Assignees({ data }) {
  return (
    <div className={styles.assignees}>
      <img
        src={
          data?.user_img_url || "https://i.ibb.co/v3vVV8r/default-avatar.png"
        }
        alt=""
        className={styles.userimg}
      />
      <div className={styles.nameandpoints}>
        <p className={styles.name}>{data.first_name}</p>
        <p className={styles.points}>{data.points}</p>
      </div>
    </div>
  );
}

export default Assignees;
