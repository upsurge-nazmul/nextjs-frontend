import React from "react";
import styles from "../../styles/ParentStore/availablePointCard.module.scss";

export default function AvailablePointCard() {
  const demokiddata = {
    image:
      "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQARtruuFZD4r-jkj2vo99Ql8CfWfaFpb7a5zMzyEtm46plv9bRRq5RrCHDsDIGgr2wOeSezORZU6aGohCb4tU",
    name: "tushar",
    points: "5.6k Points",
  };
  return (
    <div className={styles.availablePointCard}>
      <img src={demokiddata.image} alt="" className={styles.userimg} />
      <div className={styles.nameandpoints}>
        <p className={styles.name}>{demokiddata.name}</p>
        <p className={styles.points}>{demokiddata.points}</p>
      </div>
    </div>
  );
}
