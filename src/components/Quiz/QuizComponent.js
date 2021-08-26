import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Progress from "../Progress";
import styles from "../../styles/Quiz/quizcomponent.module.scss";
import SimpleProgress from "../SimpleProgress";
import LeftArrowRound from "../SVGcomponents/LeftArrowRound";
import RightArrowRound from "../SVGcomponents/RightArrowRound";

function QuizComponent({
  quiz,
  currentquestionindex,
  setcurrentquestionindex,
  totalQuestions,
  setquizfinished,
  setcorrectAnswers,
  setshowQuiz,
  widthHeight,
  setanswersheet,
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [answered, setanswered] = useState(false);
  const [result, setresult] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [timeoutf, settimeoutf] = useState(null);
  const [nexttime, setnexttime] = useState(0);
  const [nextinterval, setnextinterval] = useState(null);
  useEffect(() => {
    setanswered(false);
    setresult("");
    setShowResult(false);
    setSelectedOption("");
  }, [currentquestionindex]);

  useEffect(() => {
    if (!selectedOption || answered) return;
    let obj = {};
    if (selectedOption == quiz.correct_answer) {
      obj = {
        question: quiz.question,
        result: "correct",
      };
      setresult("Correct Answer");
      setcorrectAnswers((prev) => prev + 1);
    } else {
      obj = {
        question: quiz.question,
        result: "wrong",
        correctAnswer: quiz[`option${[quiz.correct_answer]}`],
      };
      setresult("Wrong Answer");
    }
    setanswersheet((prev) => [...prev, obj]);
    setanswered(true);
    setShowResult(true);
  }, [selectedOption]);

  useEffect(() => {
    clearTimeout(timeoutf);
    clearInterval(nextinterval);
    const root = document.documentElement;
    root?.style.setProperty("--progressnextbutton", `${0}%`);
  }, [currentquestionindex]);

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

  // useEffect(() => {
  //   let task = setInterval(() => setShowResult(false), 3000);
  //   return () => clearInterval(task);
  // }, [showResult]);
  return (
    <div className={styles.quiz}>
      <SimpleProgress
        questions={totalQuestions}
        current={currentquestionindex}
        setcurrent={setcurrentquestionindex}
      />
      {currentquestionindex !== 0 ? (
        <div
          className={styles.leftbutton}
          onClick={() => setcurrentquestionindex(currentquestionindex - 1)}
        >
          <LeftArrowRound />
        </div>
      ) : null}
      {currentquestionindex + 1 < totalQuestions ? (
        <div
          className={styles.rightbutton}
          onClick={() => setcurrentquestionindex(currentquestionindex + 1)}
        >
          <RightArrowRound />
        </div>
      ) : null}
      <div className={styles.questionno}>
        Question {currentquestionindex + 1}/{totalQuestions}
      </div>
      <div className={styles.question}>{quiz.question}</div>
      <div className={styles.options}>
        {new Array(4).fill("a").map((option, index) => {
          return (
            <div
              key={"quizoption" + index}
              className={`${styles.option + " " + styles.grad}  ${
                selectedOption === index + 1 ? styles.selected : ""
              }`}
              onClick={() => {
                if (!answered) setSelectedOption(index + 1);
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
              <p className={styles.text}>{quiz[`option${index + 1}`]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default QuizComponent;
