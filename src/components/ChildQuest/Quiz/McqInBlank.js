import styles from "../../../styles/knowledgeQuest/Quiz.module.scss";

export default function MCQInBlank({ data, value, setValue }) {
  return (
    <div className={styles.mcqInBlank}>
      <div className={styles.question}>
        {data.question.map((qn, i) => {
          return (
            <div className={styles.blankQn} key={"data-question" + i}>
              <span className={styles.qnText}>{qn}</span>
              {i < data.question.length - 1 && (
                <span className={styles.dash}> ... ... </span>
              )}
            </div>
          );
        })}
      </div>
      <div className={styles.options}>
        {data.options.map((option, i) => {
          return (
            <div
              key={"dataoptions" + i}
              className={
                option === value ? styles.selectedOption : styles.option
              }
              onClick={() => setValue(option)}
            >
              {option.map((op, i) => (
                <div key={"dataoptions-option" + i}>
                  <span>{op}</span>
                  {i < option.length - 1 && (
                    <span style={{ marginRight: "5px" }}>,</span>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
