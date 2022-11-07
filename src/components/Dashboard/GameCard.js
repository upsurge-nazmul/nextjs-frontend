import { Router, useRouter } from "next/dist/client/router";
import React from "react";
import styles from "../../styles/Dashboard/gamecard.module.scss";
import Buttons from "../Buttons";
import GameSvg from "../SVGcomponents/GameSvg";
import UnicoinSvg from "../SVGcomponents/UniCoinSvg";

function GameCard({ data, onCLick, cardstyle, reward }) {
  const router = useRouter();
  if (!data) return null;
  return (
    <div
      className={styles.gameCard}
      style={cardstyle}
      onClick={onCLick ? onCLick : () => router.push("/dashboard/k/games")}
    >
      <img
        src={
          data?.img ||
          (data?.name && `/images/games/${data?.name.replace(/ /g, "")}.png`) ||
          ""
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
        <div className={styles.actionArea}>
          <Buttons>
            Play
            <GameSvg className={styles.icon} />
          </Buttons>
        </div>
        {/* <div className={styles.chatbtn}>
          Play
          <GameSvg className={styles.icon} />
        </div> */}
      </div>
    </div>
  );
}

export default GameCard;
