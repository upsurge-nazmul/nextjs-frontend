import { useState } from "react";
import styles from "../../../styles/knowledgeQuest/Quiz.module.scss";
import Blank from "./Blank";
import Enamuration from "./Enamuration";
import Matching from "./Matching";
import MCQ from "./MCQ";
import OneWordAns from "./OneWorAns";
import PhotoQn from "./PhotoQn";
import TrueFalse from "./TrueFalse";
import VideoQn from "./VideoQn";
import YesNo from "./YesNo";

const TYPES = [
  "mcq",
  "yes-no",
  "video-qn",
  "true-false",
  "fill-in-the-blanks",
  "matching",
  "one-word-answer",
  "photo-qn",
  "enumeration",
];

export default function Quiz({ data, setCurrentQnIndex }) {
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
        ) : (
          ""
        )}
      </div>
      <div>
        {value ? (
          <div className={styles.actionArea}>
            <button
              className={styles.blankAction}
              onClick={() => {
                setCurrentQnIndex((prev) => prev + 1);
                setValue();
              }}
            >
              Next
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
