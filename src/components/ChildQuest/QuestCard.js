import styles from "../../styles/knowledgeQuest/QuestCard.module.scss";
import Image from "next/image";
import LockSvg from "../SVGcomponents/LockSvg";

const BG_COLORS = [
  "#cbc7ea",
  "#b8dfd8",
  "#DBDFFD",
  "#efccb6",
  "#FFC4C4",
  "#ddd",
  "#ddd",
  "#ddd",
  "#ddd",
  "#aad1f6",
  "#F8ECD1",
  "#ddd",
  "#ddd",
  "#ddd",
  "#ddd",
  "#ddd",
  "#ddd",
  "#ddd",
  "#ddd",
  "#ddd",
  "#ddd",
  "#ddd",
  "#ddd",
];
const TEXT_COLORS = [
  "#574285",
  "#1b6556",
  "#242F9B",
  "#7a3f27",
  "#A10035",
  "#333",
  "#333",
  "#333",
  "#333",
  "#1a426d",
  "#85586F",
  "#333",
  "#333",
  "#333",
  "#333",
  "#333",
  "#333",
  "#333",
  "#333",
  "#333",
];

function QuestCard({
  data,
  typeProps,
  handleCardClick,
  userPlanType,
  setShowSubToPremium,
}) {
  return (
    <>
      {data ? (
        <div
          className={styles.questCard}
          onClick={() => {
            console.log(userPlanType, data.premium_plan);
            if (userPlanType >= data.premium_plan) {
              handleCardClick(data.questId);
            } else {
              setShowSubToPremium(true);
              console.log("Buy a premium plan");
            }
          }}
        >
          <div
            className={styles.cardHeader}
            style={{ backgroundColor: BG_COLORS[data.questNo - 1] }}
          >
            <div className={styles.imageTitle}>
              <p style={{ color: TEXT_COLORS[data.questNo - 1] }}>
                {data.title}
              </p>
            </div>
            <div className={styles.imageWrapper}>
              <Image
                src={`/images/kq/${data.questId}.png`}
                height={"100%"}
                width={"100%"}
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
      ) : (
        ""
      )}
    </>
  );
}

export default QuestCard;
