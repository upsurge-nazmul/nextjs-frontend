import styles from "../../styles/Quiz/quizFinished.module.scss";
import Jasper from "../SVGcomponents/Jasper";

export default function QuizFinished({
  openFull,
  score,
  // reload,
  router,
  finishedData
}) {
  return (
    <div
      className={`${styles.resultSection}  ${openFull ? styles.hideOverFlow : ""
        }`}
    >
      <Jasper className={styles.jasper} />
      <div className={styles.content}>
        <div
          className={styles.heading}
          style={{
            color:
              score <= 40
                ? "#4166EB"
                : score <= 80
                  ? "#FDCC03"
                  : "#17D1BC",
          }}
        >
          {score <= 40
            ? "Money Rookie"
            : score <= 80
              ? "Money Ninja"
              : "Money Master"}
        </div>
        {/* <p className={styles.subheading}>
          {score <= 40
            ? `Looks like you are a Money Rookie! Don’t worry, that’s what we’re here for! Join upsurge’s waiting list and subscribe to our newsletter to start your journey towards financial freedom today.`
            : score <= 80
              ? `You have substantial knowledge of Financial Literacy but there is a lot of scope of improvement. Join upsurge’s waiting list and subscribe to our newsletter. `
              : `You have substantial Personal Finance knowledge. But there is no end to learning. Join upsurge’s waiting list and subscribe to our newsletter.`}
        </p> */}
        {
          finishedData && (
            <div className={styles.table}>
              <div className={styles.tableContent}>
                <div className={styles.row}>
                  <div className={styles.label}>School Name: </div>
                  <div className={styles.value}>{finishedData.school}</div>
                </div>
                <div className={styles.row}>
                  <div className={styles.label}>Name: </div>
                  <div className={styles.value}>{finishedData.fullName}</div>
                </div>
                <div className={styles.row}>
                  <div className={styles.label}>Username: </div>
                  <div className={styles.value}>{finishedData.userName}</div>
                </div>
                <div className={styles.row}>
                  <div className={styles.label}>UserId: </div>
                  <div className={styles.value} style={{ fontSize: '14px'}}>{finishedData.userId}</div>
                </div>
              </div>
            </div>
          )
        }
        <div className={styles.points}>You scored : {score}%</div>
        <div className={styles.actionArea}>
          {/* <div className={styles.button} onClick={reload}>
            Play Again
          </div> */}
          <div className={styles.button} onClick={() => router.push("/dashboard/k")}>
            Go to Dashboard
          </div>
        </div>
      </div>
    </div>
  );
}