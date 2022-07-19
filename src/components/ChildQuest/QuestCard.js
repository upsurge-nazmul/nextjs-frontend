import styles from "../../styles/knowledgeQuest/QuestCard.module.scss";
import GameSvg from "../SVGcomponents/GameSvg";

function QuestCard({ data, handleCardClick }) {
  if (!data) return null;

  return (
    <div
      className={styles.questCard}
      onClick={() => handleCardClick(data.questId)}
    >
      <img
        src={
          data?.img ||
          (data?.name && `/images/games/${data?.name.replace(/ /g, "")}.png`) ||
          "https://is2-ssl.mzstatic.com/image/thumb/Purple128/v4/76/cb/4b/76cb4bed-4eeb-f452-6ebe-7797c254eb47/source/512x512bb.jpg"
        }
        alt=""
        className={styles.img}
      />
      <div className={styles.contentWrapper}>
        <p className={styles.title}>{data?.title || ""}</p>
        <p className={styles.detail}>
          {data?.questDescription.length > 50
            ? data?.questDescription.substring(0, 50) + "..."
            : data?.questDescription || ""}
        </p>
        <div className={styles.startBtn}>
          Start
          <GameSvg className={styles.icon} />
        </div>
      </div>
    </div>
  );
}

export default QuestCard;
