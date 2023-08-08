import styles from "../../styles/TodaysQuestion/answer.module.scss";

const Answer = ({
  data = "",
  onClick = () => {},
  selected = false,
  isAlreadyAnswered = false,
  isCorrectAns = false,
  isCorrect = false,
  disabled = false,
}) => {
  return (
    <div
      className={
        isAlreadyAnswered && isCorrect
          ? styles.answerGreen
          : isCorrectAns
          ? styles.answerGreen
          : isAlreadyAnswered && !isCorrect
          ? styles.answerRed
          : selected
          ? styles.answerSelected
          : styles.answer
      }
      onClick={disabled ? () => {} : onClick}
    >
      <div className={styles.answerText}>{data}</div>
      <div>
        <div className={styles.ansCircle} />
      </div>
    </div>
  );
};

export default Answer;
