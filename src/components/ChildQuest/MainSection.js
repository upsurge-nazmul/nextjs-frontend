import { useRouter } from "next/dist/client/router";
import styles from "../../styles/knowledgeQuest/MainSection.module.scss";
import QuestCard from "./QuestCard";

const QUEST_TYPES = [
  { title: "Financial Literacy", background: "#fcd9d9", font: "#850606" },
  { title: "Entrepreneurship", background: "#e8cae8", font: "#931393" },
  { title: "Career Quests", background: "#ccc", font: "#333" },
  { title: "Industry Quests", background: "#ccc", font: "#333" },
];

export default function MainSection({ data }) {
  const router = useRouter();

  const handleCardClick = (id) => {
    router.push(`/dashboard/k/quest/${id}`);
  };

  return (
    <div className={styles.mainSection}>
      {QUEST_TYPES.map((QT, i) => {
        return (
          <div className={styles.questArea} key={i}>
            <div className={styles.heading} style={{ color: QT.font }}>
              {QT.title}
            </div>
            <div className={styles.quests}>
              {data &&
                data.length &&
                data.map((item) => {
                  if (item.quest_type === QT.title) {
                    return (
                      <QuestCard
                        handleCardClick={handleCardClick}
                        data={item}
                        typeProps={QT}
                        key={item.questNo}
                      />
                    );
                  }
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
