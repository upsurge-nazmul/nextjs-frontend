import { Router, useRouter } from "next/dist/client/router";
import React from "react";
import styles from "../../styles/Dashboard/gamecard.module.scss";
import GameSvg from "../SVGcomponents/GameSvg";
import UnicoinSvg from "../SVGcomponents/UniCoinSvg";

function GameCard({ data, onCLick, cardstyle, reward }) {
  const router = useRouter();
  if (!data) return null;
  return (
    <div
      className={styles.gameCard}
      style={cardstyle}
      onClick={onCLick ? onCLick : () => router.push("/gamepage")}
    >
      <img
        src={
          data?.img ||
          (data?.name && `/images/games/${data?.name.replace(/ /g, "")}.png`) ||
          "https://is2-ssl.mzstatic.com/image/thumb/Purple128/v4/76/cb/4b/76cb4bed-4eeb-f452-6ebe-7797c254eb47/source/512x512bb.jpg"
        }
        alt=""
      />
      <div className={styles.contentWrapper}>
        <p className={styles.title}>{data?.name || ""}</p>
        <p className={styles.detail}>
          {data?.description.length > 40
            ? data?.description.substring(0, 40) + "..."
            : data?.description || ""}
        </p>
        {reward && (
          <p className={styles.reward}>
            <UnicoinSvg className={styles.icon} />
            {reward}
          </p>
        )}
        <div className={styles.chatbtn}>
          Play
          <GameSvg className={styles.icon} />
        </div>
      </div>
    </div>
  );
}

export default GameCard;
