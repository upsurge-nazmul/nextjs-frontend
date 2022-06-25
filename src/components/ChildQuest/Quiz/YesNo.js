import styles from "../../../styles/knowledgeQuest/Quiz.module.scss";

export default function YesNo({ data, value, setValue }) {
  return (
    <div className={styles.yesNo}>
      <div className={styles.question}>{data.question}</div>
      <div className={styles.options}>
        <button
          className={value === "Yes" ? styles.selectedYes : styles.yes}
          onClick={() => setValue("Yes")}
        >
          Yes
        </button>
        <div className={styles.separator} />
        <button
          className={value === "No" ? styles.selectedNo : styles.no}
          onClick={() => setValue("No")}
        >
          No
        </button>
      </div>
    </div>
  );
}
