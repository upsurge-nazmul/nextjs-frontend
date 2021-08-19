import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Progress from "../Progress";
import styles from "../../styles/Quiz/quizcomponent.module.scss";
import SimpleProgress from "../SimpleProgress";

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
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M47.2212 23.6106C47.2212 10.5711 36.6501 -1.82279e-07 23.6106 -4.0712e-07C10.5712 -6.31962e-07 6.82025e-05 10.5711 6.76325e-05 23.6106C6.70625e-05 36.65 10.5712 47.2211 23.6106 47.2211C36.6501 47.2211 47.2212 36.65 47.2212 23.6106ZM28.3478 16.5424C28.7388 16.1376 28.9551 15.5954 28.9502 15.0326C28.9453 14.4698 28.7196 13.9315 28.3216 13.5335C27.9237 13.1356 27.3853 12.9098 26.8225 12.9049C26.2597 12.9001 25.7176 13.1164 25.3127 13.5074L16.7271 22.093C16.3247 22.4956 16.0986 23.0414 16.0986 23.6106C16.0986 24.1797 16.3247 24.7256 16.7271 25.1281L25.3127 33.7137C25.7176 34.1047 26.2597 34.3211 26.8225 34.3162C27.3853 34.3113 27.9237 34.0856 28.3216 33.6876C28.7196 33.2896 28.9453 32.7513 28.9502 32.1885C28.9551 31.6257 28.7388 31.0835 28.3478 30.6787L21.2796 23.6106L28.3478 16.5424Z"
              fill="#4166EB"
            />
          </svg>
        </div>
      ) : null}
      {currentquestionindex + 1 < totalQuestions ? (
        <div
          className={styles.rightbutton}
          onClick={() => setcurrentquestionindex(currentquestionindex + 1)}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.000487515 23.6101C0.000487938 36.6496 10.5716 47.2207 23.611 47.2207C36.6505 47.2207 47.2216 36.6496 47.2216 23.6101C47.2216 10.5707 36.6505 -0.000421776 23.611 -0.000421007C10.5716 -0.000420239 0.000487092 10.5707 0.000487515 23.6101ZM18.8739 30.6783C18.4829 31.0831 18.2666 31.6253 18.2715 32.1881C18.2764 32.7509 18.5021 33.2892 18.9001 33.6872C19.298 34.0851 19.8364 34.3109 20.3992 34.3158C20.9619 34.3206 21.5041 34.1043 21.9089 33.7133L30.4946 25.1277C30.897 24.7251 31.123 24.1793 31.123 23.6101C31.123 23.041 30.897 22.4951 30.4946 22.0926L21.9089 13.507C21.5041 13.116 20.9619 12.8996 20.3992 12.9045C19.8364 12.9094 19.298 13.1351 18.9001 13.5331C18.5021 13.9311 18.2764 14.4694 18.2715 15.0322C18.2666 15.595 18.4829 16.1372 18.8739 16.542L25.9421 23.6101L18.8739 30.6783Z"
              fill="#4166EB"
            />
          </svg>
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
