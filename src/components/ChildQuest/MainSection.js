import styles from "../../styles/knowledgeQuest/MainSection.module.scss";
import QuestCard from "./QuestCard";

export default function MainSection({
  data,
  tab,
  handleCardClick,
  QUEST_TYPES,
  userData
}) {
const userPlanType = userData.premium_plan;
  return (
    <div className={styles.mainSection}>
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
                  userPlanType={userPlanType}
                />
              );
            }
          })}
      </div>
    </div>
  );
}
