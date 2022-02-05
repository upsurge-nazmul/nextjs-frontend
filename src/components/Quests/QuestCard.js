import { Router, useRouter } from "next/dist/client/router";
import React from "react";
import styles from "../../styles/Quest/questcard.module.scss";
import GameSvg from "../SVGcomponents/GameSvg";

export default function QuestCard({ data, onCLick, cardstyle }) {
  const router = useRouter();
  return (
    <div
      className={styles.questCard}
      style={cardstyle}
      onClick={
        onCLick ? onCLick : () => router.push("/dashboard/p/quest/" + data.id)
      }
    >
      <img
        src={
          data.img_url ||
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
        <div className={styles.chatbtn}>Show Details</div>
      </div>
    </div>
  );
}
