import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/MoneyAce/maquiz.module.scss";
import KnowledgeQuestApi from "../../actions/apis/KnowledgeQuestApi";
import { getCookie } from "../../actions/cookieUtils";
import Jasper from "../SVGcomponents/Jasper";
import Curve1 from "../SVGcomponents/Curve1";
import Curve2 from "../SVGcomponents/Curve2";
import SimpleProgress from "../SimpleProgress";
import { MainContext } from "../../context/Main";
import MoneyAceApis from "../../actions/apis/MoneyAceApis";
export default function MoneyAceQuiz({
  quiz,
  setquiz,
  settasks,
  currenttask,
  setcurrenttab,
}) {
  const colorarray = ["#FDCC03", "#17D1BC", "#FF6263", "#4166EB"];
  const [currentcolor, setcurrentcolor] = useState(0);
  const [currentquestionindex, setcurrentquestionindex] = useState(0);
  const [loading, setloading] = useState(true);
  const { userdata, setuserdata } = useContext(MainContext);
  const [error, seterror] = useState("");
  const [completed, setcompleted] = useState("");
  const [questions, setquestions] = useState([]);
  const [selectedOption, setselectedOption] = useState();
  const [score, setscore] = useState(0);
  useEffect(() => {
    getquestions();
    async function getquestions() {
      let res = await MoneyAceApis.getquestions(
        { id: quiz },
        getCookie("accesstoken")
      );
      if (res && res.data && res.data.success) {
        setquestions(res.data.data);
      } else {
        seterror(res?.data?.message || "Error connecting to server");
      }
      setloading(false);
    }
  }, [quiz]);
  async function fetchnextquestion(answer) {
    let res = await MoneyAceApis.checkanswer(
      { id: questions[currentquestionindex].question_id, answer: answer },
      getCookie("accesstoken")
    );
    if (res && res.data && res.data.success) {
      setscore((prev) => prev + 1);
    }
    if (currentquestionindex === questions.length - 1) {
      setcompleted(true);
      return;
    }
    setcurrentquestionindex((prev) => prev + 1);
    setselectedOption();
  }
  async function completetask() {
    let res = await MoneyAceApis.completetask({ id: currenttask });
    if (res && res.data && res.data.success) {
      setquiz("");
      settasks((prev) => prev.filter((item) => item.id !== currenttask));
      setcurrenttab("xx");
      setcurrenttab("dashboard");
    } else {
      seterror(res?.data?.message || "Error connecting to server");
    }
  }
  return (
    <div className={styles.maquiz}>
      <div className={styles.bg} />
      <div className={styles.main}>
        <p className={styles.heading}>Quiz - {quiz}</p>
        <div className={styles.divmain}>
          <div className={styles.quiz}>
            <SimpleProgress
              extrastyle={{ marginBottom: "20px" }}
              clr={
                colorarray[currentcolor] === "#4166EB" ? "#17D1BC" : "#4166EB"
              }
              questions={questions?.length || 0}
              current={currentquestionindex}
              setcurrent={setcurrentquestionindex}
            />
            <div className={styles.background}>
              <div className={styles.curvecontainer}>
                <Curve1 className={styles.curve1} />
                <Curve2 className={styles.curve2} />
              </div>
            </div>
            <div className={styles.questionno}>
              Question {currentquestionindex + 1}/{questions.length}
            </div>
            {questions.length > 0 && !completed && (
              <>
                <div className={styles.question}>
                  {questions[currentquestionindex].question}
                </div>
                <div className={styles.options}>
                  {new Array(4).fill("a").map((option, index) => {
                    if (
                      !questions[currentquestionindex][`option${index + 1}`]
                    ) {
                      return null;
                    } else
                      return (
                        <div
                          key={"quizoption" + index}
                          className={`${styles.option + " " + styles.grad}  ${
                            selectedOption === index + 1 ? styles.selected : ""
                          }`}
                          onClick={() => {
                            setselectedOption(index + 1);
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
                            {
                              questions[currentquestionindex][
                                `option${index + 1}`
                              ]
                            }
                          </p>
                        </div>
                      );
                  })}
                </div>
              </>
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
                      setscore(0);
                      setcurrentquestionindex(0);
                      setcompleted(false);
                      setselectedOption(null);
                    }}
                  >
                    Retry
                  </div>
                ) : (
                  <div className={styles.button} onClick={completetask}>
                    Finish
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <img
          className={styles.homebtn}
          onClick={() => setquiz("")}
          src="https://imgcdn.upsurge.in/images/homepng.png"
          alt=""
        />
      </div>
    </div>
  );
}
