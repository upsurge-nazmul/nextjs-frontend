import { useEffect } from "react";
import styles from "../../../styles/knowledgeQuest/Quiz.module.scss";

export default function Enamuration({ data, value, setValue }) {
  useEffect(() => {
    setValue(["", ""]);
  }, []);

  const handleChange = (e, val) => {
    // setValue(e.target.value);
    val[e.target.id] += e.target.value;
    setValue(val);
  };

  return (
    <div className={styles.enamuration}>
      <div className={styles.question}>{data.question}</div>
      {value && (
        <div className={styles.answerArea}>
          {data.correct_answer.map((ans, i) => {
            return (
              <input
                id={i}
                value={value[i]}
                onChange={(e) => handleChange(e, value)}
                key={i}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
