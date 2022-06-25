import styles from "../../../styles/knowledgeQuest/Quiz.module.scss";

export default function TrueFalse({ data, value, setValue }) {
  return (
    <div className={styles.trueFalse}>
      <div className={styles.question}>{data.question}</div>
      <div className={styles.options}>
        <button
          className={value === "True" ? styles.selectedTrue : styles.true}
          onClick={() => setValue("True")}
        >
          True
        </button>
        <div className={styles.separator} />
        <button
          className={value === "False" ? styles.selectedFalse : styles.false}
          onClick={() => setValue("False")}
        >
          False
        </button>
      </div>
    </div>
  );
}
