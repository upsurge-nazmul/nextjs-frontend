import { useEffect } from "react";
import styles from "../../../styles/knowledgeQuest/Quiz.module.scss";

export default function MissingLetter({ data, value, setValue }) {
  useEffect(() => {
    setValue([]);
  }, [data]);

  const handleChange = (e) => {
    if (e.nativeEvent.data) {
      // if not 'Backspace' pressed
      setValue((prev) => [...prev, String(e.target.value).toUpperCase()]);
    } else {
      // if 'Backspace' pressed remove the previous one
      setValue((prev) => {
        if (prev && prev.length >= 1) {
          prev.pop();
          return prev;
        } else return prev;
      });
    }
  };

  return (
    <div className={styles.missingLetter}>
      <div className={styles.question}>
        {data.question.map((qn, i) => {
          return (
            <div className={styles.blankQn} key={i}>
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
            <span className={styles.option} key={i}>
              <span className={styles.text}>{option}</span>
              {i < data.options.length - 1 && (
                <input
                  type={"text"}
                  value={value ? null : ""}
                  className={styles.input}
                  maxLength={1}
                  onChange={handleChange}
                />
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
