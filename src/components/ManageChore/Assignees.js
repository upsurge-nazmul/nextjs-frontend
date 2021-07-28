import React from "react";
import styles from "../../styles/ManageChore/assignees.module.scss";

function Assignees() {
  const demokiddata = {
    image:
      "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQARtruuFZD4r-jkj2vo99Ql8CfWfaFpb7a5zMzyEtm46plv9bRRq5RrCHDsDIGgr2wOeSezORZU6aGohCb4tU",
    name: "tushar",
    points: "5.6k Points",
  };
  return (
    <div className={styles.assignees}>
      <img src={demokiddata.image} alt="" className={styles.userimg} />
      <div className={styles.nameandpoints}>
        <p className={styles.name}>{demokiddata.name}</p>
        <p className={styles.points}>{demokiddata.points}</p>
      </div>
      <div className={styles.nudgebutton}>Nudge</div>
    </div>
  );
}

export default Assignees;
