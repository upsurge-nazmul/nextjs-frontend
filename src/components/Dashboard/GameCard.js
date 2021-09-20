import React from "react";
import styles from "../../styles/Dashboard/gamecard.module.scss";

function GameCard({ data }) {
  return (
    <div className={styles.gameCard}>
      <img
        src={
          data.img ||
          "https://is2-ssl.mzstatic.com/image/thumb/Purple128/v4/76/cb/4b/76cb4bed-4eeb-f452-6ebe-7797c254eb47/source/512x512bb.jpg"
        }
        alt=""
      />
      <div className={styles.contentWrapper}>
        <p className={styles.title}>{data.title || "Test Card"}</p>
        <p className={styles.detail}>{data.detail || "Test Card"}</p>
      </div>
    </div>
  );
}

export default GameCard;
