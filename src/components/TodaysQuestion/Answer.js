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
      className={`${
        isAlreadyAnswered && isCorrect
          ? styles.answerGreen
          : isCorrectAns
          ? styles.answerGreen
          : isAlreadyAnswered && !isCorrect
          ? styles.answerRed
          : styles.answer
      } col-12 my-1 d-flex align-items-center rounded-pill px-3 py-1`}
      onClick={disabled ? () => {} : onClick}
    >
      <div className={`flex-grow-1 ${styles.answerText}`}>{data}</div>
      <div>
        <div
          className={`${
            selected ? styles.ansCircleSelected : styles.ansCircle
          } rounded-circle`}
        />
      </div>
    </div>
  );
};

export default Answer;