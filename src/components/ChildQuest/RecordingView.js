import styles from "../../styles/knowledgeQuest/Views.module.scss";

export default function RecordingView({
  chapterId,
  backHandler = () => {},
  doneHandler = () => {},
}) {
  return (
    <div>
      <iframe
        id="iframe"
        className={`${styles.map} ${styles.course}`}
        src={
          chapterId === "KnowingYourMoney"
            ? "/quests/KnowingYourMoney/story.html"
            : chapterId === "KiarasBudgetTrip"
            ? "/quests/KiarasBudgetTrip/story.html"
            : "/quests/bankvisit/story.html"
        }
      ></iframe>
      <div className={styles.actionArea}>
        <button onClick={backHandler}>Go Back</button>
        <button onClick={doneHandler}>Done</button>
      </div>
    </div>
  );
}
