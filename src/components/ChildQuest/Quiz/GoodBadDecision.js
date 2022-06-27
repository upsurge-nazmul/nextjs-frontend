import styles from "../../../styles/knowledgeQuest/Quiz.module.scss";

export default function GoodBadDecision({ data, value, setValue }) {
  return (
    <div className={styles.goodBadDecision}>
      <div className={styles.question}>{data.question}</div>
      <div className={styles.options}>
        <button
          className={
            value === "Good Decision" ? styles.selectedTrue : styles.true
          }
          onClick={() => setValue("Good Decision")}
        >
          Good Decision
        </button>
        <div className={styles.separator} />
        <button
          className={
            value === "Not a good decision"
              ? styles.selectedFalse
              : styles.false
          }
          onClick={() => setValue("Not a good decision")}
        >
          Not a good decision
        </button>
      </div>
    </div>
  );
}
