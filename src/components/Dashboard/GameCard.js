import React from "react";
import styles from "../../styles/Dashboard/gamecard.module.scss";

function GameCard({ data }) {
  return (
    <div className={styles.gameCard}>
      <img src={data.img} alt="" />
      <div className={styles.contentWrapper}>
        <p className={styles.title}>{data.title}</p>
        <p className={styles.detail}>{data.detail}</p>
      </div>
    </div>
  );
}

export default GameCard;
