import styles from "../../../styles/knowledgeQuest/Quiz.module.scss";

export default function Blank({ data, value, setValue }) {
  return (
    <div className={styles.blank}>
      <div className={styles.blankQnArea}>
        {data.question.map((qn, i) => {
          return (
            <div className={styles.blankQn} key={"blank" + i}>
              <span className={styles.qnText}>{qn}</span>
              {i < data.question.length - 1 && (
                <input
                  type="text"
                  value={value ? value : ""}
                  className={styles.qnInput}
                  onChange={(e) => setValue(e.target.value)}
                />
              )}
            </div>
          );
        })}
      </div>
      {data.options && data.options.length && (
        <div className={styles.options}>
          {data.options.map((option, i) => {
            return (
              <div
                key={"blank" + i}
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
    </div>
  );
}
