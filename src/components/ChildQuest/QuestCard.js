import styles from "../../styles/knowledgeQuest/QuestCard.module.scss";
import Image from "next/image";
import LockSvg from "../SVGcomponents/LockSvg";
import UniCoinSvg from "../SVGcomponents/UniCoinSvg";

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
            className={styles.cardTop}
            style={{ backgroundImage: `url(/images/kq/${data.questId}.webp)` }}
          ></div>
          <div className={styles.cardBottom}>
            <div
              className={`${styles.content} mb-3`}
              style={
                userPlanType >= data.premium_plan
                  ? { borderTopColor: "#FDCC03" }
                  : { borderTopColor: "#FF4E4E" }
              }
            >
              <p className={styles.title}>{data?.title}</p>
              {/* <p className={styles.desc}>{data?.questDescription}</p> */}
              <div className={styles.info}>
                <div className={styles.chapters}>
                  {`${data.chapters.length} chapters`}{" "}
                </div>
                <div className={styles.unicoins}>
                  <div className={styles.coin}>
                    <UniCoinSvg className={styles.svg} />
                  </div>
                  {/* {`${data.totalUnicoins}`} */}
                  {Math.round(data.totalUnicoins).toLocaleString("en-IN", {
                    currency: "INR",
                  })}
                </div>
              </div>
            </div>
            <div
              className={`${styles.actionButton} rounded-pill text-center py-1`}
              style={
                userPlanType >= data.premium_plan
                  ? { backgroundColor: "#FDCC03" }
                  : { backgroundColor: "#FF4E4E" }
              }
            >
              {userPlanType >= data.premium_plan ? (
                <span className={styles.open}>&#9658;</span>
              ) : (
                <LockSvg className={styles.lock} />
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default QuestCard;
