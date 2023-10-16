import styles from "../../styles/Quiz/quizFinished.module.scss";
import Jasper from "../SVGcomponents/Jasper";

export default function QuizFinished({
  openFull,
  score,
  reload,
  router
}) {
  return (
    <div
      className={`${styles.resultSection}  ${openFull ? styles.hideOverFlow : ""
        }`}
    >
      <Jasper className={styles.jasper} />
      <div className={styles.background}>
      </div>

      <p
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
      </p>
      <p className={styles.subheading}>
        {score <= 40
          ? `Looks like you are a Money Rookie! Don’t worry, that’s what we’re here for! Join upsurge’s waiting list and subscribe to our newsletter to start your journey towards financial freedom today.`
          : score <= 80
            ? `You have substantial knowledge of Financial Literacy but there is a lot of scope of improvement. Join upsurge’s waiting list and subscribe to our newsletter. `
            : `You have substantial Personal Finance knowledge. But there is no end to learning. Join upsurge’s waiting list and subscribe to our newsletter.`}
      </p>
      <div className={styles.points}>You scored : {score}%</div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div className={styles.button} onClick={reload}>
          Play Again
        </div>
        <div className={styles.button} onClick={() => router.push("/dashboard/k")}>
          Go to Dashboard
        </div>
      </div>
    </div>
  );
}