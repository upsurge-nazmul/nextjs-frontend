import styles from "../../styles/knowledgeQuest/QuestCard.module.scss";
import Image from "next/image";

const BG_COLORS = [
  "#cbc7ea",
  "#b8dfd8",
  "#b8dfd8",
  "#efccb6",
  "#efccb6",
  "#ddd",
  "#ddd",
  "#ddd",
  "#ddd",
  "#aad1f6",
  "#aad1f6",
  "#ddd",
  "#ddd",
  "#ddd",
  "#ddd",
];
const TEXT_COLORS = [
  "#574285",
  "#1b6556",
  "#1b6556",
  "#7a3f27",
  "#7a3f27",
  "#333",
  "#333",
  "#333",
  "#333",
  "#1a426d",
  "#1a426d",
  "#333",
  "#333",
  "#333",
  "#333",
];

function QuestCard({ data, typeProps, handleCardClick }) {
  if (!data) return null;

  return (
    <div
      className={styles.questCard}
      onClick={() => handleCardClick(data.questId)}
    >
      <div
        className={styles.cardHeader}
        style={{ backgroundColor: BG_COLORS[data.questNo - 1] }}
      >
        <div className={styles.imageTitle}>
          <p style={{ color: TEXT_COLORS[data.questNo - 1] }}>{data.title}</p>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src={require(`../../assets/kqTiles/${data.questId}Tile.svg`)}
            alt={data.questId}
            className={styles.img}
          />
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div
          className={styles.typeChip}
          style={{
            backgroundColor: typeProps.background,
            color: typeProps.font,
          }}
        >
          <p>{data.quest_type}</p>
        </div>
        {/* <p className={styles.title}>{data?.title || ""}</p> */}
        <p className={styles.detail}>
          {data?.questDescription.length > 70
            ? data?.questDescription.substring(0, 70) + "..."
            : data?.questDescription || ""}
        </p>
        <p className={styles.info}>{`${data.chapters.length} chapters`}</p>
      </div>
    </div>
  );
}

export default QuestCard;
