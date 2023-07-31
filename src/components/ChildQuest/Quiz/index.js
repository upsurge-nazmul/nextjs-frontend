import { useState } from "react";
import styles from "../../../styles/knowledgeQuest/Quiz.module.scss";
import Blank from "./Blank";
import Enamuration from "./Enamuration";
import GoodBadDecision from "./GoodBadDecision";
import ImageCat from "./ImageCat";
import Matching from "./Matching";
import MCQ from "./MCQ";
import MCQInBlank from "./McqInBlank";
import MissingLetter from "./MissingLetter";
import OneWordAns from "./OneWorAns";
import PhotoQn from "./PhotoQn";
import TrueFalse from "./TrueFalse";
import VideoQn from "./VideoQn";
import YesNo from "./YesNo";

const TYPES = [
  "mcq", // 0
  "yes-no", // 1
  "video-qn", // 2
  "true-false", // 3
  "fill-in-the-blanks", // 4
  "matching", // 5
  "one-word-answer", // 6
  "photo-qn", // 7
  "enumeration", // 8
  "good-bad-decision", // 9
  "mcq-in-blank", // 10
  "missing-letters", // 11
  "image-categorize", // 12
];

export default function Quiz({
  data,
  matchAnswer,
  correctAns,
  correctAnsValue,
  handleNextClick,
  handleSkip, // for temporary 'Skip' button
}) {
  const { type } = data;
  const [value, setValue] = useState();

  return (
    <div className={styles.quizSection}>
      <div className={styles.quizContent}>
        {type === TYPES[0] ? (
          <MCQ {...{ data, value, setValue }} />
        ) : type === TYPES[1] ? (
          <YesNo {...{ data, value, setValue }} />
        ) : type === TYPES[2] ? (
          <VideoQn {...{ data, value, setValue }} />
        ) : type === TYPES[3] ? (
          <TrueFalse {...{ data, value, setValue }} />
        ) : type === TYPES[4] ? (
          <Blank {...{ data, value, setValue }} />
        ) : type === TYPES[5] ? (
          <Matching {...{ data, value, setValue }} />
        ) : type === TYPES[6] ? (
          <OneWordAns {...{ data, value, setValue }} />
        ) : type === TYPES[7] ? (
          <PhotoQn {...{ data, value, setValue }} />
        ) : type === TYPES[8] ? (
          <Enamuration {...{ data, value, setValue }} />
        ) : type === TYPES[9] ? (
          <GoodBadDecision {...{ data, value, setValue }} />
        ) : type === TYPES[10] ? (
          <MCQInBlank {...{ data, value, setValue }} />
        ) : type === TYPES[11] ? (
          <MissingLetter {...{ data, value, setValue }} />
        ) : type === TYPES[12] ? (
          <ImageCat {...{ data, value, setValue }} />
        ) : (
          ""
        )}
      </div>
      <div className={styles.actionArea}>
        {correctAnsValue ? (
          <div className={styles.correctAnsArea}>
            <div className={styles.correctAns}>
              <span className={styles.correctAnsLabel}>Correct answer is</span>
              <span
                className={
                  correctAns ? styles.correctAnsValue : styles.wrongAnsValue
                }
              >
                {
                  Array.isArray(correctAnsValue) ? correctAnsValue.join(", ") : correctAnsValue
                }
              </span>
            </div>
            <button
              className={styles.nextButton}
              onClick={() => {
                handleNextClick();
                setValue();
              }}
            >
              Next
            </button>
          </div>
        ) : (
          <button
            className={value ? styles.submitButton : styles.disabledButton}
            onClick={() => {
              if (value) matchAnswer(value);
            }}
          >
            Submit
          </button>
        )}
        {/* <button
          style={{
            marginLeft: "10px",
            backgroundColor: "red",
            borderColor: "red",
          }}
          className={styles.submitButton}
          onClick={handleSkip}
        >
          Skip
        </button> */}
      </div>
    </div>
  );
}
