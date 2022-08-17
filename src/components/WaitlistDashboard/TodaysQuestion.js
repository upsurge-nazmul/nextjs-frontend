import React, { useState } from "react";
import QuizApis from "../../actions/apis/QuizApis";
import styles from "../../styles/WaitlistDashboard/todaysquestion.module.scss";
import RemoveSvg from "../SVGcomponents/RemoveSvg";
import TickSvg from "../SVGcomponents/TickSvg";
export default function TodaysQuestion({ data }) {
  const [answered, setanswerd] = useState(data.is_answered);
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState("");
  const [is_correct, setis_correct] = useState(data.is_correct || false);
  const [correctAns, setCorrectAns] = useState();

  async function submittodaysquestion(option) {
    setloading(true);
    let res = await QuizApis.submittodaysquestion({
      q_id: data.id,
      selected_option: option,
    });
    if (res && res.data && res.data.success) {
      setanswerd(true);
      setis_correct(res.data.data.is_correct);
      setCorrectAns(res.data.data.correct_ans);
    } else {
      seterr("Cannot connect to server");
    }
    setloading(false);
  }
  return (
    <div
      className={`${styles.todaysquestion} ${
        !is_correct && answered && styles.wronganswer
      }`}
      id="todays-question"
    >
      <p className={styles.heading}>{"Today's question"}</p>
      {answered ? (
        <>
          {is_correct ? (
            <TickSvg
              className={`${styles.tick} ${!is_correct && styles.wrongtick}`}
            />
          ) : (
            <RemoveSvg
              className={`${styles.tick} ${!is_correct && styles.wrongtick}`}
            />
          )}
          {!is_correct && correctAns && (
            <div className={styles.correctAns}>
              <div className={styles.corrAnsLabel}>Correct Answer</div>
              <div className={styles.corrAnsValue}>{data[correctAns]}</div>
            </div>
          )}
          <p className={styles.msg}>
            {is_correct
              ? "Congratulations, please come back tomorrow for a new question."
              : "Thanks for attempting, please come back tomorrow for a new question."}
          </p>
          <p
            className={`${styles.answered} ${
              !is_correct && styles.wronganswered
            }`}
          >
            {is_correct ? "Correct answer" : "Wrong answer"}
          </p>
        </>
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
