import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Progress from "../Progress";
import styles from "../../styles/Quiz/quizcomponent.module.scss";

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
      <Progress
        questions={totalQuestions}
        current={currentquestionindex}
        setcurrent={setcurrentquestionindex}
      />
      <p className={styles.question}>{quiz.question}</p>
      <div className={styles.options}>
        {new Array(4).fill("a").map((option, index) => {
          return (
            <div
              className={`${styles.option + " " + styles.grad}  ${
                selectedOption === index + 1 ? styles.selected : ""
              }`}
              onClick={() => {
                if (!answered) setSelectedOption(index + 1);
              }}
            >
              <p className={styles.text}>{quiz[`option${index + 1}`]}</p>
            </div>
          );
        })}
      </div>
      <AnimatePresence>
        {answered && showResult ? (
          <motion.div
            initial={{
              opacity: 0.5,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{ type: "tween", duration: 0.2 }}
            className={styles.result}
          >
            {result ? (
              currentquestionindex !== totalQuestions - 1 ? (
                <div
                  className={styles.nextButton}
                  onClick={() => {
                    clearTimeout(timeoutf);
                    clearInterval(nextinterval);
                    setnexttime(2000);
                    setcurrentquestionindex((prev) => prev + 1);
                  }}
                >
                  <div className={styles.grad + " " + styles.nextpercent}></div>
                  <p>Next</p>
                </div>
              ) : null
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default QuizComponent;
