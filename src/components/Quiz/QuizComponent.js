import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Progress from "../Progress";
import styles from "../../styles/Quiz/quizcomponent.module.scss";
import SimpleProgress from "../SimpleProgress";
import LeftArrowRound from "../SVGcomponents/LeftArrowRound";
import RightArrowRound from "../SVGcomponents/RightArrowRound";
import QuizApis from "../../actions/apis/QuizApis";

function QuizComponent({
  currentquestionindex,
  setcurrentquestionindex,
  totalQuestions,
  setquizfinished,
  setcorrectAnswers,
  setshowQuiz,
  widthHeight,
  setanswersheet,
  question,
  data,
  setscore,
  setcurrentcolor,
  currentcolor,
  colorarray,
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [answered, setanswered] = useState(false);
  const [result, setresult] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [timeoutf, settimeoutf] = useState(null);
  const [nexttime, setnexttime] = useState(0);
  const [nextinterval, setnextinterval] = useState(null);
  const [currentquestion, setcurrentquestion] = useState(question);
  const [loading, setloading] = useState(false);

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
    setcurrentcolor((currentcolor + 1) % colorarray.length);
    setloading(true);
    let res = await QuizApis.nextquestion({
      answer,
      question_id: currentquestion.question_id,
      id: data.session_id,
    });
    if (res && res.data.success) {
      if (res.data.data.quizcompleted) {
        setquizfinished(true);
        setscore(res.data.data.score);
      }
      setcurrentquestion(res.data.data.next_question);
      setcurrentquestionindex((prev) => prev + 1);
    }
    setloading(false);
  }

  // useEffect(() => {
  //   let task = setInterval(() => setShowResult(false), 3000);
  //   return () => clearInterval(task);
  // }, [showResult]);
  return (
    <div className={styles.quiz}>
      <SimpleProgress
        clr={colorarray[currentcolor] === "#4166EB" ? "#17D1BC" : "#4166EB"}
        questions={15}
        current={currentquestionindex}
        setcurrent={setcurrentquestionindex}
      />
      {/* {currentquestionindex !== 0 ? (
        <div
          className={styles.leftbutton}
          onClick={() => setcurrentquestionindex(currentquestionindex - 1)}
        >
          <LeftArrowRound />
        </div>
      ) : null} */}
      {/* {currentquestionindex + 1 < totalQuestions ? (
        <div
          className={styles.rightbutton}
          onClick={() => setcurrentquestionindex(currentquestionindex + 1)}
        >
          <RightArrowRound />
        </div>
      ) : null} */}

      <div className={styles.questionno}>
        Question {currentquestionindex + 1}/{totalQuestions}
      </div>
      <div className={styles.question}>{currentquestion.question}</div>
      <div className={styles.options}>
        {new Array(4).fill("a").map((option, index) => {
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
  );
}

export default QuizComponent;
