import styles from "../../../styles/knowledgeQuest/CompletedQuiz.module.scss";
import Jasper from "../../SVGcomponents/Jasper";
import Curve1 from "../../SVGcomponents/Curve1";
import Curve2 from "../../SVGcomponents/Curve2";

export default function Completed({
  score,
  scoreOn,
  handleRetry,
  handleFinish,
}) {
  return (
    <div className={`${styles.resultSection}`}>
      <Jasper className={styles.jasper} />
      <div className={styles.background}>
        <div className={styles.curvecontainer}>
          <Curve1 className={styles.curve1} />
          <Curve2 className={styles.curve2} />
        </div>
      </div>

      <div className={styles.points}>
        You scored : {score}/{scoreOn}
      </div>

      {score === 0 ? (
        <div className={styles.button} onClick={handleRetry}>
          Retry
        </div>
      ) : (
        <div className={styles.button} onClick={handleFinish}>
          Finish
        </div>
      )}
    </div>
  );
}
