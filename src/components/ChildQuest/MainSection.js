import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import styles from "../../styles/knowledgeQuest/MainSection.module.scss";
import QuestCard from "./QuestCard";
import Tabs from "./Tabs";

const QUEST_TYPES = [
  { title: "All Categories", background: "#ccc", font: "#333" },
  { title: "Financial Literacy", background: "#fcd9d9", font: "#850606" },
  { title: "Entrepreneurship", background: "#e8cae8", font: "#931393" },
  { title: "Career Quests", background: "#ccc", font: "#333" },
  { title: "Industry Quests", background: "#ccc", font: "#333" },
];

export default function MainSection({ data }) {
  const router = useRouter();
  const [tab, setTab] = useState(QUEST_TYPES[0]);

  const handleCardClick = (id) => {
    router.push(`/dashboard/k/quest/${id}`);
  };

  return (
    <div className={styles.mainSection}>
      <Tabs list={QUEST_TYPES} current={tab} setCurrent={setTab} />
      <div className={styles.questArea}>
        {data &&
          data.length &&
          data.map((item) => {
            if (
              tab.title === item.quest_type ||
              tab.title === QUEST_TYPES[0].title
            ) {
              return (
                <QuestCard
                  handleCardClick={handleCardClick}
                  data={item}
                  typeProps={QUEST_TYPES.find(
                    (qt) => qt.title === item.quest_type
                  )}
                  key={item.questNo}
                />
              );
            }
          })}
      </div>
    </div>
  );
}
