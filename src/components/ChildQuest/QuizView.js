import React, { useEffect, useState } from "react";
import styles from "../../styles/knowledgeQuest/Views.module.scss";
import SimpleProgress from "../SimpleProgress";
import KnowledgeQuestApi from "../../actions/apis/KnowledgeQuestApi";
import { getCookie } from "../../actions/cookieUtils";
import Quiz from "./Quiz";
import Completed from "./Quiz/Completed";

export default function QuizView({ chapterId, questId, handleDone }) {
  const colorarray = ["#FDCC03", "#17D1BC", "#FF6263", "#4166EB"];
  const [currentcolor, setcurrentcolor] = useState(0);
  const [currentQnIndex, setCurrentQnIndex] = useState(0);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");
  const [completed, setcompleted] = useState("");
  const [questions, setquestions] = useState([]);
  const [selectedOption, setselectedOption] = useState();
  const [score, setScore] = useState(0);
  const [correctAns, setCorrectAns] = useState(false);
  const [correctAnsValue, setCorrectAnsValue] = useState("");

  useEffect(() => {
    getquestions();
    async function getquestions() {
      let res = await KnowledgeQuestApi.getquestions(
        { id: chapterId },
        getCookie("accesstoken")
      );
      if (res && res.data && res.data.success) {
        setquestions(res.data.data);
      } else {
        seterror(res?.data?.message || "Error connecting to server");
      }
      setloading(false);
    }
  }, [chapterId]);

  async function matchAnswer(answer) {
    let res = await KnowledgeQuestApi.checkanswer(
      { id: questions[currentQnIndex].id, answer: answer, chapterId },
      getCookie("accesstoken")
    );

    if (res && res.data && res.data.success) {
      if (res.data.message === "Correct answer") {
        setScore((prev) => prev + 1);
        setCorrectAns(true);
      }
      setCorrectAnsValue(res.data.data.correct_answer);
    }
    setselectedOption();
  }

  function goNext() {
    setCorrectAns(false);
    setCorrectAnsValue("");
    if (currentQnIndex === questions.length - 1) {
      setcompleted(true);
    } else {
      setCurrentQnIndex((prev) => prev + 1);
    }
  }

  function handleSkip() {
    if (currentQnIndex === questions.length - 1) {
      setcompleted(true);
    } else {
      setCurrentQnIndex((prev) => prev + 1);
    }
  }

  function handleRetry() {
    setScore(0);
    setCurrentQnIndex(0);
    setcompleted(false);
    setselectedOption(null);
  }

  async function handleFinish() {
    await KnowledgeQuestApi.updatequizdata({
      quest_id: questId,
      quiz_id: chapterId,
      score,
    });
    mixpanel.track("Knowledge Quest Quiz", {
      event: `Quest Finished ${chapterId}`,
      chapterId: `${chapterId}`,
    });
    if (score > 0) {
      handleDone();
    }
  }

  return (
    <div className={styles.view}>
      <div className={styles.quizView}>
        <SimpleProgress
          clr={colorarray[currentcolor] === "#4166EB" ? "#17D1BC" : "#4166EB"}
          questions={questions?.length || 0}
          current={currentQnIndex}
          setcurrent={setCurrentQnIndex}
        />
        <div className={styles.questionno}>
          Question {currentQnIndex + 1}/{questions.length}
        </div>
        {questions.length > 0 && !completed && (
          <Quiz
            data={questions[currentQnIndex]}
            matchAnswer={matchAnswer}
            correctAns={correctAns}
            correctAnsValue={correctAnsValue}
            handleNextClick={goNext}
            handleSkip={handleSkip}
          />
        )}
        {completed && (
          <Completed
            {...{
              chapterId,
              score,
              scoreOn: questions.length,
              handleRetry,
              handleFinish,
            }}
          />
        )}
      </div>
    </div>
  );
}
