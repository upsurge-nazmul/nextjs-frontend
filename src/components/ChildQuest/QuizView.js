import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/knowledgeQuest/Views.module.scss";
import SimpleProgress from "../SimpleProgress";
import Curve1 from "../SVGcomponents/Curve1";
import Curve2 from "../SVGcomponents/Curve2";
import KnowledgeQuestApi from "../../actions/apis/KnowledgeQuestApi";
import { getCookie } from "../../actions/cookieUtils";
import Jasper from "../SVGcomponents/Jasper";
import { MainContext } from "../../context/Main";
import Quiz from "./Quiz";

export default function QuizView({ chapterId, setlevel, setmode, level }) {
  const colorarray = ["#FDCC03", "#17D1BC", "#FF6263", "#4166EB"];
  const [currentcolor, setcurrentcolor] = useState(0);
  const [currentQnIndex, setCurrentQnIndex] = useState(0);
  const [loading, setloading] = useState(true);
  const { userdata, setuserdata } = useContext(MainContext);
  const [error, seterror] = useState("");
  const [completed, setcompleted] = useState("");
  const [questions, setquestions] = useState([]);
  const [selectedOption, setselectedOption] = useState();
  const [score, setScore] = useState(0);

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
      { id: questions[currentQnIndex].id, answer: answer },
      getCookie("accesstoken")
    );
    if (res && res.data && res.data.success) {
      setScore((prev) => prev + 1);
    }
    if (currentQnIndex === questions.length - 1) {
      setcompleted(true);
      return;
    }
    setCurrentQnIndex((prev) => prev + 1);
    setselectedOption();
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
            setCurrentQnIndex={setCurrentQnIndex}
          />
        )}
        {completed && (
          <div className={`${styles.resultSection}`}>
            <Jasper className={styles.jasper} />
            <div className={styles.background}>
              <div className={styles.curvecontainer}>
                <Curve1 className={styles.curve1} />
                <Curve2 className={styles.curve2} />
              </div>
            </div>

            <div className={styles.points}>
              You scored : {score}/{questions.length}
            </div>

            {score === 0 ? (
              <div
                className={styles.button}
                onClick={() => {
                  setScore(0);
                  setCurrentQnIndex(0);
                  setcompleted(false);
                  setselectedOption(null);
                }}
              >
                Retry
              </div>
            ) : (
              <div
                className={styles.button}
                onClick={() => {
                  KnowledgeQuestApi.updatequizdata({
                    id: "money-quest",
                    score: score / questions.length,
                  });
                  KnowledgeQuestApi.update({
                    level: Number(level) + 1,
                    id: "money-quest",
                  });
                  setuserdata((prev) => ({
                    ...prev,
                    num_unicoins:
                      Number(prev.num_unicoins) +
                      150 +
                      (score === questions.length ? 25 : 0),
                  }));
                  setlevel(Number(level) + 1);
                  setmode("map");
                }}
              >
                Finish
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
