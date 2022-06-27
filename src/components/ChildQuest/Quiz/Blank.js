import styles from "../../../styles/knowledgeQuest/Quiz.module.scss";

export default function Blank({ data, value, setValue }) {
  return (
    <div className={styles.blank}>
      <div className={styles.blankQnArea}>
        {data.question.map((qn, i) => {
          return (
            <div className={styles.blankQn} key={i}>
              <span className={styles.qnText}>{qn}</span>
              {i < data.question.length - 1 && (
                <input
                  value={value}
                  className={styles.qnInput}
                  onChange={(e) => setValue(e.target.value)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
