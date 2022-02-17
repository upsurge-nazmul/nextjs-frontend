import React from "react";
import { UniCoinValue } from "../../../config";
import styles from "../../styles/Tribes/tribelpendingsection.module.scss";

export default function TribePendingSection({ data }) {
  return (
    <div className={styles.tribeleaderboard}>
      <p className={styles.heading}>Pending Members</p>
      <div className={styles.wrapper}>
        {data.map((item) => {
          return (
            <div className={styles.row} key={item.id}>
              <img src={item.user_img_url} alt="" />
              <div className={styles.right}>
                <p className={styles.name}>
                  {item.first_name + " " + item.last_name}
                </p>
                <p className={styles.unicoins}>Approval Pending..</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
