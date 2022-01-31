import React from "react";
import styles from "../../styles/Tribes/tribeleaderboard.module.scss";

export default function TribeLeaderboard({ data }) {
  return (
    <div className={styles.tribeleaderboard}>
      <p className={styles.heading}>Leaderboard</p>
      <div className={styles.wrapper}>
        {data.map((item) => {
          return (
            <div className={styles.row}>
              <img src={item.user_img_url} alt="" />
              <div className={styles.right}>
                <p className={styles.name}>
                  {item.first_name + " " + item.last_name}
                </p>
                <p className={styles.unicoins}>{item.num_unicoins} UniCoins</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
