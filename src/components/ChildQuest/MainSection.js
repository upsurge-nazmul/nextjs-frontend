import { useRouter } from "next/dist/client/router";
import styles from "../../styles/knowledgeQuest/MainSection.module.scss";
import QuestCard from "./QuestCard";
import HeadingArrow from "../SVGcomponents/HeadingArrow";

const QUEST_TYPES = [
  "Financial Literacy",
  "Entrepreneurship",
  "Career Quests",
  "Industry Quests",
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
            <div className={styles.heading}>
              {QT} <HeadingArrow />
            </div>
            <div className={styles.quests}>
              {data &&
                data.length &&
                data.map((item) => {
                  if (item.quest_type === QT) {
                    return (
                      <QuestCard
                        handleCardClick={handleCardClick}
                        data={item}
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
