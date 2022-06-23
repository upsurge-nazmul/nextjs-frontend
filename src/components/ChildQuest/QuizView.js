import styles from "../../styles/knowledgeQuest/Views.module.scss";

export default function QuizView({
  backHandler = () => {},
  doneHandler = () => {},
}) {
  return (
    <div>
      Quiz View
      <div className={styles.actionArea}>
        <button onClick={backHandler}>Go Back</button>
        <button onClick={doneHandler}>Done</button>
      </div>
    </div>
  );
}
