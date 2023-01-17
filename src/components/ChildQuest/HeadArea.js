import React, { useEffect, useState } from "react";
import styles from "../../styles/knowledgeQuest/Head.module.scss";
import Image from "next/image";
import HeaderCard from "./HeaderCard";

export default function HeadArea({ data, handleCardClick, tab }) {
  const [currentData, setCurrentData] = useState();
  const [highlight, setHighlight] = useState(data[0]);

  useEffect(() => {
    if (data) {
      let filt = data.filter((item) => item.quest_type === tab.title);
      if (filt.length) {
        setCurrentData(filt);
        setHighlight(filt[0]);
      } else {
        setCurrentData(data);
        setHighlight(data[0]);
      }
    }
  }, [data, tab]);

  return (
    <>
      {highlight && currentData && (
        <div className={styles.headSection}>
          <div
            className={styles.left}
            onClick={() => handleCardClick(highlight.questId)}
          >
            <div className={styles.banner}>
              <Image
                src={require(`../../assets/kq/${highlight.questId}.png`)}
                alt={highlight.questId}
                className={styles.img}
                height={200}
                width={250}
              />
            </div>
            <div
              className={styles.typeChip}
              style={{ backgroundColor: tab.background, color: tab.font }}
            >
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
            {currentData.slice(1, 4).map((item) => {
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
      )}
    </>
  );
}
