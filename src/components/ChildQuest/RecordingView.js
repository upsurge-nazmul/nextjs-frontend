import styles from "../../styles/knowledgeQuest/RecordingViewer.module.scss";

export default function RecordingView({ questId }) {
  return (
    <iframe
      id="iframe"
      className={`${styles.map} ${styles.course}`}
      src={
        questId === "KnowingYourMoney"
          ? "/quests/KnowingYourMoney/story.html"
          : questId === "KiarasBudgetTrip"
          ? "/quests/KiarasBudgetTrip/story.html"
          : "/quests/bankvisit/story.html"
      }
    ></iframe>
  );
}
