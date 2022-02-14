import React from "react";
import { UniCoinValue } from "../../../config";
import styles from "../../styles/Tribes/tribeleaderboard.module.scss";

export default function TribeLeaderboard({ data }) {
  return (
    <div className={styles.tribeleaderboard}>
      <p className={styles.heading}>Leaderboard</p>
      <div className={styles.wrapper}>
        {data.map((item) => {
          return (
            <div className={styles.row} key={item.id}>
              <img src={item.user_img_url} alt="" />
              <div className={styles.right}>
                <p className={styles.name}>
                  {item.first_name + " " + item.last_name}
                </p>
                <p className={styles.unicoins}>
                  {Number(item.num_unicoins) / UniCoinValue > 1000
                    ? Number(item.num_unicoins) / UniCoinValue + "K"
                    : Number(item.num_unicoins)}{" "}
                  UniCoins
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
