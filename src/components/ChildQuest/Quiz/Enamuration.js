import { useState, useEffect } from "react";
import styles from "../../../styles/knowledgeQuest/Quiz.module.scss";

export default function Enamuration({ data, value, setValue }) {
  const [answers, setAnswers] = useState();

  useEffect(() => {
    if (data && data.correct_answer) {
      let ansArr = {};
      for (let i in data.correct_answer) {
        ansArr[i] = "";
      }
      setAnswers(ansArr);
    }
  }, [data]);

  useEffect(() => {
    if (answers) {
      setValue(answers);
    }
  }, [answers]);

  const handleChange = (e, i) => {
    setAnswers((prev) => {
      return {
        ...prev,
        [i]: (prev[i] = e.target.value),
      };
    });
  };

  return (
    <div className={styles.enamuration}>
      <div className={styles.question}>{data.question}</div>
      {answers && (
        <div className={styles.answerArea}>
          {data.correct_answer.map((ans, i) => {
            return (
              <input
                id={i}
                value={answers[i]}
                onChange={(e) => handleChange(e, i)}
                key={i}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
