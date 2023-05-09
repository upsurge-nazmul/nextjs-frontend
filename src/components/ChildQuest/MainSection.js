import { useState, useEffect } from "react";
import styles from "../../styles/knowledgeQuest/MainSection.module.scss";
import QuestCard from "./QuestCard";

export default function MainSection({
  data,
  tab,
  handleCardClick,
  QUEST_TYPES,
  userData,
  setShowSubToPremium,
}) {
  const [newData, setNewData] = useState("");
  const [checkData, setCheckData] = useState(true);
  const userPlanType = userData.premium_plan;
  useEffect(() => {
    setNewData(
      data.map((item) => {
        if (tab.title === item.quest_type) {
          return item;
        } else {
          return null;
        }
      })
      );
  }, [tab]);
  function areAllElementsNull(array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] !== null) {
        return true;
      }
    }
    return false;
  }
  useEffect(()=>{
    setCheckData(areAllElementsNull(newData));
  },[newData]);
  return (
    <div className={styles.mainSection}>
      <div className={styles.questArea}>
        {data &&
          data.length &&
          data.map((item) => {
            if (
              tab.title === item.quest_type
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
                  setShowSubToPremium={setShowSubToPremium}
                />
              );
            }
          })}
      </div>
        {!checkData && 
        <div className={styles.comingSoon}>
          Coming Soon
        </div>
        }
    </div>
  );
}
