import React from "react";
import { UniCoinValue } from "../../../config";
import styles from "../../styles/ParentStore/availablePointCard.module.scss";

export default function AvailablePointCard({ data }) {
  return (
    <div className={styles.availablePointCard}>
      <img src={data?.user_img_url} alt="" className={styles.userimg} />
      <div className={styles.nameandpoints}>
        <p className={styles.name}>{data?.first_name}</p>
        <p className={styles.points}>
          {data?.num_unicoins > 1000
            ? data?.num_unicoins / UniCoinValue + "K "
            : data?.num_unicoins + " "}
          UniCoins
        </p>
      </div>
    </div>
  );
}
