import { Router, useRouter } from "next/dist/client/router";
import React from "react";
import styles from "../../styles/Dashboard/gamecard.module.scss";
import Buttons from "../Buttons";
import GameSvg from "../SVGcomponents/GameSvg";
import UniCoinSvg from "../SVGcomponents/UniCoinSvg";

function GameCard({ data, onClick, reward }) {
  const router = useRouter();
  if (!data) return null;

  return (
    <div className={styles.gameCard} style={{
      backgroundImage: 'url(' + (data?.img ||
        (data?.name && `/images/games/${data?.name.replace(/ /g, "")}.png`) ||
        "") + ')'
    }} 
    onClick={() => {
      onClick ? onClick() : () => router.push("/dashboard/k/games");
      mixpanel.track("Game started", { event: `Game Started ${data.name}`, gameName: `${data.id}` });
    }}
    >
      <p className={styles.title}>{data?.name || ""}</p>


      <div className={styles.actionArea}>
        <Buttons type={"animated"}
          >
          <GameSvg className={styles.icon} />
        </Buttons>
      </div>

      {reward && (
        <div className={styles.unicoins}>
          <div className={styles.coin}><UniCoinSvg className={styles.svg} /></div>
          {reward}
        </div>
      )}

    </div>
  );
}

export default GameCard;
