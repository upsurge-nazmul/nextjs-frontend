import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/Quiz/quizcomponent.module.scss";
import QuizApis from "../../actions/apis/QuizApis";
import { MainContext } from "../../context/Main";
import QuizProgress from "../QuizProgress";

function QuizComponent({
  currentquestionindex,
  setcurrentquestionindex,
  totalQuestions,
  setquizfinished,
  question,
  data,
  setscore,
  setcurrentcolor,
  currentcolor,
  colorarray,
  userlogged,
  timer,
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [answered, setanswered] = useState(false);
  const [timeoutf, settimeoutf] = useState(null);
  const [nexttime, setnexttime] = useState(0);
  const [nextinterval, setnextinterval] = useState(null);
  const [currentquestion, setcurrentquestion] = useState(question);
  const [loading, setloading] = useState(false);
  const { theme } = useContext(MainContext);

  function secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    return (
      (hours !== 0 ? hours + " hr : " : "") +
      (minutes !== 0 ? minutes + " min : " : "") +
      seconds +
      " s"
    );
  }

  useEffect(() => {
    if (answered) {
      clearTimeout(timeoutf);
      clearInterval(nextinterval);
      if (currentquestionindex !== totalQuestions - 1) {
        setnexttime(0);
        setnextinterval(
          setInterval(() => setnexttime((prev) => prev + 16), 10)
        );
        settimeoutf(
          setTimeout(() => setcurrentquestionindex((prev) => prev + 1), 2000)
        );
      }
    }
  }, [answered]);

  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty(
      "--progressnextbutton",
      `${(nexttime / 2000) * 100}%`
    );
  }, [nexttime]);

  async function fetchnextquestion(answer) {
    if (loading) return;
    setloading(true);
    let res = await QuizApis.nextquestion({
      answer,
      question_id: currentquestion.question_id,
      id: data.session_id,
      user_logged: userlogged,
    });
    if (res && res.data.success) {
      if (res.data.data.quizcompleted) {
        setquizfinished(true);
        setscore(res.data.data.score);
      }
      setcurrentquestion(res.data.data.next_question);
      setcurrentcolor((currentcolor + 1) % colorarray.length);
      setcurrentquestionindex((prev) => prev + 1);
    }
    setloading(false);
  }

  // useEffect(() => {
  //   let task = setInterval(() => setShowResult(false), 3000);
  //   return () => clearInterval(task);
  // }, [showResult]);
  return (
    <div className={`${styles.quiz} ${theme === "dark" && styles.darkquiz}`}>
      <div className={styles.background}>
      </div>
      <div className={styles.quizInfo}>
        <div className={styles.infoItem}>
          <div className={styles.infoValue}>
            {currentquestionindex + 1} / {totalQuestions}
          </div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.infoLabel}>Time Left</div>
          <div className={styles.infoValue}>
            {secondsToTime(timer / 1000)}
          </div>
        </div>
      </div>
      <QuizProgress totalQn={15} currentQn={currentquestionindex + 1} />
      <div className={styles.quizBody}>
        <div className={styles.questionArea}>
          <div className={styles.questionNo}>{currentquestionindex + 1}</div>
          <div className={styles.question}>{currentquestion.question}</div>
        </div>
        <div className={styles.options}>
          {new Array(4).fill("a").map((option, index) => {
            if (!currentquestion[`option${index + 1}`]) {
              return null;
            } else
              return (
                <div
                  key={"quizoption" + index}
                  className={`${styles.option + " " + styles.grad}  ${
                    selectedOption === index + 1 ? styles.selected : ""
                  }`}
                  onClick={() => {
                    fetchnextquestion(index + 1);
                  }}
                >
                  <div className={styles.circle}>
                    {index === 0
                      ? "A"
                      : index === 1
                      ? "B"
                      : index === 2
                      ? "C"
                      : "D"}
                  </div>
                  <p className={styles.text}>
                    {currentquestion[`option${index + 1}`]}
                  </p>
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}

export default QuizComponent;
