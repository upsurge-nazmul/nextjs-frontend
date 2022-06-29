import styles from "../../../styles/knowledgeQuest/Quiz.module.scss";

export default function MCQ({ data, value, setValue }) {
  return (
    <div className={styles.mcq}>
      <div className={styles.question}>{data.question}</div>
      <div className={styles.options}>
        {data.options.map((option, i) => {
          return (
            <div
              key={"mcq" + i}
              className={
                option === value ? styles.selectedOption : styles.option
              }
              onClick={() => setValue(option)}
              key={i}
            >
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
}
