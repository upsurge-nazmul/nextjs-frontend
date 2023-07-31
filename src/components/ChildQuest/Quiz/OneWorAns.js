import styles from "../../../styles/knowledgeQuest/Quiz.module.scss";

export default function OneWordAns({ data, value, setValue }) {
  return (
    <div className={styles.oneWord}>
      <div className={styles.question}>{data.question}</div>
      {data.options && data.options.length && (
        <div className={styles.options}>
          {data.options.map((option, i) => {
            return (
              <div
                key={"oneWordAns" + i}
                className={
                  option === value ? styles.selectedOption : styles.option
                }
                onClick={() => setValue(option)}
              >
                {option}
              </div>
            );
          })}
        </div>
      )}
      <div className={styles.answer}>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
    </div>
  );
}
