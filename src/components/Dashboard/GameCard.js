import { Router, useRouter } from "next/dist/client/router";
import React from "react";
import styles from "../../styles/Dashboard/gamecard.module.scss";
import GameSvg from "../SVGcomponents/GameSvg";

function GameCard({ data, onCLick, cardstyle }) {
  const router = useRouter();
  return (
    <div
      className={styles.gameCard}
      style={cardstyle}
      onClick={onCLick ? onCLick : () => router.push("/gamepage")}
    >
      <img
        src={
          (data?.name && `/images/games/${data?.name.replace(/ /g, "")}.jpg`) ||
          "https://is2-ssl.mzstatic.com/image/thumb/Purple128/v4/76/cb/4b/76cb4bed-4eeb-f452-6ebe-7797c254eb47/source/512x512bb.jpg"
        }
        alt=""
      />
      <div className={styles.contentWrapper}>
        <p className={styles.title}>{data?.name || ""}</p>
        <p className={styles.detail}>
          {data?.description.length > 50
            ? data.description.substring(0, 50) + "..."
            : data.description || ""}
        </p>
        <div className={styles.chatbtn}>
          Play
          <GameSvg className={styles.icon} />
        </div>
      </div>
    </div>
  );
}

export default GameCard;
