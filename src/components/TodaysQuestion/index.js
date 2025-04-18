import { useContext, useEffect, useState } from "react";
import UniCoinSvg from "../../components/SVGcomponents/UniCoinSvg";
import Answer from "./Answer";
import styles from "../../styles/TodaysQuestion/todaysQuestion.module.scss";
import QuizApis from "../../actions/apis/QuizApis";
import CircularProgress from "@mui/material/CircularProgress";
import { MainContext } from "../../context/Main";

const UNICOINS_FOR_QUESTION = 1000;

const TodaysQuestion = ({ data }) => {
  const { setUnicoinsEarnedPopUp, setUnicoins } = useContext(MainContext);
  const [todaysQuestion, setTodaysQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(""); // a, b, c, d as current selected answer, if not selected already in that day
  const [correctAns, setCorrectAns] = useState(""); // a, b, c, d as correct answer, if already answered in that day
  const [alredyAnswered, setAlredyAnswered] = useState(""); // a, b, c, d as alredy answered in that day
  const [isCorrect, setIsCorrect] = useState(false); // if alredy answered then is correct or not

  useEffect(() => {
    if (data) {
      setAlredyAnswered(data.selected_option);
      setCorrectAns(data.correct_ans);
      setIsCorrect(data.is_correct);
      setTodaysQuestion(data);
      setLoading(false);
    }
  }, [data]);

  const isSubmitDisabled = () => {
    if (answer === "") return true;
    if (alredyAnswered) return true;
  };

  const handleAnsSubmit = async () => {
    setLoading(true);
    const response = await QuizApis.submittodaysquestion({
      q_id: todaysQuestion.id,
      selected_option: answer,
    });
    console.log("todays qn res", response);
    if (response && response.data && response.data.success) {
      setAlredyAnswered(response.data.data.correct_ans);
      setIsCorrect(response.data.data.is_correct);
      if (response.data.data.is_correct) {
        setUnicoinsEarnedPopUp(true);
        setUnicoins(UNICOINS_FOR_QUESTION);
      }
    }
    setLoading(false);
  };

  return (
    <div className={styles.todaysQn}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerText}>{`Today's Question`}</div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.unicoinChip}>
            <UniCoinSvg className={styles.unicoinIcon} />
            <div className={styles.unicoins}>
              {UNICOINS_FOR_QUESTION.toLocaleString("en-IN", {
                currency: "INR",
              })}
            </div>
          </div>
        </div>
      </div>
      {todaysQuestion && (
        <div className={styles.questionContainer}>
          {loading ? (
            <div className={styles.loadingArea}>
              <CircularProgress style={{ color: "#4066eb" }} />
            </div>
          ) : (
            <>
              <div className={styles.question}>{todaysQuestion?.question}</div>
              <div className={styles.answer}>
                {["a", "b", "c", "d"].map((item, index) => (
                  <Answer
                    key={index}
                    data={todaysQuestion[item]}
                    onClick={() => setAnswer(item)}
                    selected={answer === item}
                    isAlreadyAnswered={alredyAnswered === item}
                    isCorrectAns={correctAns === item}
                    isCorrect={isCorrect}
                    disabled={alredyAnswered}
                  />
                ))}
              </div>
              <div className={styles.actionContainer}>
                {alredyAnswered && isCorrect ? (
                  <div className={styles.correctAns}>
                    Your answer is correct
                  </div>
                ) : alredyAnswered && !isCorrect ? (
                  <div className={styles.incorrectAns}>
                    Your answer is incorrect
                  </div>
                ) : (
                  <button
                    className={
                      isSubmitDisabled()
                        ? styles.disabledButton
                        : styles.actionButton
                    }
                    disabled={isSubmitDisabled()}
                    onClick={handleAnsSubmit}
                  >
                    Submit
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TodaysQuestion;
