import { useEffect, useState } from "react";
import UniCoinSvg from "../../components/SVGcomponents/UniCoinSvg";
import Answer from "./Answer";
import styles from "../../styles/TodaysQuestion/todaysQuestion.module.scss";
import QuizApis from "../../actions/apis/QuizApis";

const TodaysQuestion = ({ data }) => {
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

  console.log("!!!!!!!!!!", data);

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
    setLoading(false);
    setAlredyAnswered(response.data.correct_ans);
    setIsCorrect(response.data.is_correct);
  };

  return (
    <div className={styles.todaysQn}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerText}>Today's Question</div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.unicoinChip}>
            <UniCoinSvg className={styles.unicoinIcon} />
            <div className={styles.unicoins}>100</div>
          </div>
        </div>
      </div>
      {todaysQuestion && (
        <div className={styles.questionContainer}>
          {loading ? (
            <div className={styles.loadingArea}>Loading...</div>
          ) : (
            <>
              <div className={styles.question}>{todaysQuestion?.question}</div>
              <div className={styles.answer}>
                {["a", "b", "c", "d"].map((item) => (
                  <Answer
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
            </>
          )}
        </div>
      )}
      <div className={styles.actionContainer}>
        <button
          className={
            isSubmitDisabled() ? styles.disabledButton : styles.actionButton
          }
          disabled={isSubmitDisabled()}
          onClick={handleAnsSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TodaysQuestion;
