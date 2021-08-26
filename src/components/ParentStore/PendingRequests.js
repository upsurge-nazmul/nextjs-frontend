import React from "react";
import styles from "../../styles/ParentStore/pendingreq.module.scss";
import RemoveSvg from "../SVGcomponents/RemoveSvg";

export default function PendingRequests({ setshowmodal }) {
  return (
    <div className={styles.pendingRequest}>
      <img
        src="https://bbts1.azureedge.net/images/p/full/2020/08/be6a94ef-2db1-47b5-b4eb-1325f16a7179.jpg"
        alt=""
      />
      <div className={styles.taskAndTo}>
        <div className={styles.task}>Avengers Avatar</div>
        <div className={styles.to}>Requested by Pulkit</div>
      </div>
      <div className={styles.points}>
        <p className={styles.number}>800</p>
        <p>Points</p>
      </div>
      <div className={styles.button} onClick={() => setshowmodal(true)}>
        Approve Purchase
      </div>
      <div className={styles.removebutton}>
        <RemoveSvg />
      </div>
    </div>
  );
}
