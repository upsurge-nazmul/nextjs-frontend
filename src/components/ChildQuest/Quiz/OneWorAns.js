import styles from "../../../styles/knowledgeQuest/Quiz.module.scss";

export default function OneWordAns({ data, value, setValue }) {
  return (
    <div className={styles.oneWord}>
      <div className={styles.question}>{data.question}</div>
      <div className={styles.answer}>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
    </div>
  );
}
