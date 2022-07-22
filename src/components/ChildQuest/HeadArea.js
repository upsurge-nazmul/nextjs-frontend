import React, { useEffect, useState } from "react";
import styles from "../../styles/knowledgeQuest/Head.module.scss";
import Image from "next/image";
import HeaderCard from "./HeaderCard";

export default function HeadArea({ data, handleCardClick }) {
  const [highlight, setHighlight] = useState(data[0]);

  return (
    <div className={styles.headSection}>
      <div
        className={styles.left}
        onClick={() => handleCardClick(highlight.questId)}
      >
        <div className={styles.banner}>
          <Image
            src={require(`../../assets/kqTiles/${highlight.questId}Tile.svg`)}
            alt={highlight.questId}
            className={styles.img}
            height={400}
            width={300}
          />
        </div>
        <div className={styles.typeChip}>
          <p>{highlight.quest_type}</p>
        </div>
        <div>
          <p className={styles.title}>{highlight.title}</p>
          <p className={styles.detail}>
            {highlight?.questDescription.length > 100
              ? highlight?.questDescription.substring(0, 100) + "..."
              : highlight?.questDescription || ""}
          </p>
          <p
            className={styles.info}
          >{`${highlight.chapters.length} chapters`}</p>
        </div>
      </div>
      <div className={styles.right}>
        {data.slice(1, 4).map((item) => {
          return (
            <HeaderCard
              data={item}
              key={item.questNo}
              handleCardClick={handleCardClick}
            />
          );
        })}
      </div>
    </div>
  );
}
