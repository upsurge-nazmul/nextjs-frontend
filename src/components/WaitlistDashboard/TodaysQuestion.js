import React, { useState } from "react";
import QuizApis from "../../actions/apis/QuizApis";
import styles from "../../styles/WaitlistDashboard/todaysquestion.module.scss";
export default function TodaysQuestion({ data }) {
  const [answered, setanswerd] = useState(data === "Answered" ? true : false);
  const [loading, setloading] = useState(false);
  async function submittodaysquestion(option) {
    setloading(true);
    let res = await QuizApis.submittodaysquestion({
      q_id: data.id,
      selected_option: option,
    });
    if (res && res.data && res.data.success) {
      setanswerd(true);
    } else {
      alert("Cannot connect to server");
    }
    setloading(false);
  }
  return (
    <div className={styles.todaysquestion}>
      <p className={styles.heading}>Today's question</p>
      {answered ? (
        <p className={styles.answered}>Answered.</p>
      ) : (
        <>
          <p className={styles.question}>Q. {data.question}</p>
          <div className={styles.options}>
            <p
              className={styles.option}
              onClick={() => {
                if (loading) {
                  return;
                } else {
                  submittodaysquestion("a");
                }
              }}
            >
              A. {data.a}
            </p>
            <p
              className={styles.option}
              onClick={() => {
                if (loading) {
                  return;
                } else {
                  submittodaysquestion("b");
                }
              }}
            >
              B. {data.b}
            </p>
            <p
              className={styles.option}
              onClick={() => {
                if (loading) {
                  return;
                } else {
                  submittodaysquestion("c");
                }
              }}
            >
              C. {data.c}
            </p>
            <p
              className={styles.option}
              onClick={() => {
                if (loading) {
                  return;
                } else {
                  submittodaysquestion("d");
                }
              }}
            >
              D. {data.d}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
