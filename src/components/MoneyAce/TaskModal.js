import React from "react";
import styles from "../../styles/MoneyAce/taskmodal.module.scss";

export default function TaskModal({ data, settaskmodal }) {
  return (
    <div className={styles.taskmodal}>
      <div className={styles.bg} />
      <div className={styles.main}>
        <p className={styles.heading}>
          {data.action_id === "friends" ? "Go out with friends" : ""}
        </p>
        <div className={styles.divmain}>
          <p className={styles.heading}>
            Completing this task will take ₹{data.amount}{" "}
          </p>
          <div className={styles.btns}>
            <div className={styles.btn} onClick={() => settaskmodal("")}>
              <p>Confirm</p>
            </div>
            <div className={styles.btn} onClick={() => settaskmodal("")}>
              <p>Cancel</p>
            </div>
          </div>
        </div>
        <img
          className={styles.homebtn}
          onClick={() => settaskmodal("")}
          src="https://i.ibb.co/kmfyw9t/homepng.png"
          alt=""
        />
      </div>
    </div>
  );
}
