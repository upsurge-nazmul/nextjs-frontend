import React from "react";
import styles from "../../styles/ParentStore/pendingreq.module.scss";

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
        <svg
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.97169 7.31787L13.1638 3.12575C13.7618 2.52775 13.7618 1.55822 13.1638 0.960219C12.5658 0.362219 11.5963 0.362219 10.9983 0.960219L6.80616 5.15234L2.61403 0.960219C2.01603 0.362219 1.0465 0.362219 0.4485 0.960219C-0.1495 1.55822 -0.1495 2.52775 0.4485 3.12575L4.64062 7.31787L0.4485 11.51C-0.1495 12.108 -0.1495 13.0775 0.4485 13.6755C0.7475 13.9745 1.13938 14.124 1.53125 14.124C1.92313 14.124 2.31503 13.9745 2.614 13.6755L6.80616 9.48341L10.9983 13.6755C11.2973 13.9745 11.6892 14.124 12.081 14.124C12.4729 14.124 12.8648 13.9745 13.1638 13.6755C13.7618 13.0775 13.7618 12.108 13.1638 11.51L8.97169 7.31787Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}
