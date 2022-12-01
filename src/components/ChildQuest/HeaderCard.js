import styles from "../../styles/knowledgeQuest/Head.module.scss";
import Image from "next/image";
import LockSvg from "../SVGcomponents/LockSvg";

const BG_COLORS = ["#cbc7ea", "#b8dfd8", "#efccb6", "#aad1f6", "#ddd", "#ddd"];
const TEXT_COLORS = [
  "#574285",
  "#1b6556",
  "#7a3f27",
  "#1a426d",
  "#333",
  "#333",
];

function HeaderCard({ data, handleCardClick }) {
  return (
    <>
      {data ? (
        <div
          className={styles.headerCard}
          onClick={data.open ? () => handleCardClick(data.questId) : () => {}}
        >
          {!data.open ? (
            <div className={styles.locked}>
              <LockSvg className={styles.lockIcon} />
            </div>
          ) : (
            ""
          )}
          <div className={styles.cardLeft}>
            <div className={styles.imageWrapper}>
              <Image
                src={require(`../../assets/kqTiles/${data.questId}Tile.svg`)}
                alt={data.questId}
                className={styles.img}
                height={114}
                width={202}
              />
            </div>
          </div>
          <div className={styles.cardRight}>
            <div className={styles.cardType}>
              <p>{data.quest_type}</p>
            </div>
            <p className={styles.cardTitle}>{data.title}</p>
            <p className={styles.cardDetail}>
              {data?.questDescription.length > 100
                ? data?.questDescription.substring(0, 100) + "..."
                : data?.questDescription || ""}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default HeaderCard;
