import styles from "../../styles/Quiz/quizManual.module.scss";
import Jasper from "../SVGcomponents/Jasper";

export default function QuizManual({ setstarted }) {
  return (
    <div className={styles.startscreen}>
      <div className={styles.main}>
          <div className={styles.heading}>
            How to calculate your Money Quotient
          </div>
        <div className={styles.content}>
          <div className={styles.left}>
            <Jasper className={styles.jasper} />
          </div>
          <div className={styles.right}>
            <ul>
              <li className={styles.text}>
                You will be asked 15 questions and have to choose the option
                which you think is correct.
              </li>
              <li className={styles.text}>
                The aim of this quiz is to help you see where you stand when it
                comes to understanding your personal finances, banking, saving,
                investments, and money!{" "}
              </li>
              <li className={styles.text}>
                This is a dynamic quiz that adapts the difficulty level
                according to your answers. The tougher questions you get right,
                the more points you will get.{" "}
              </li>
              <li className={styles.text}>
                {`Let's start and see how you do on our Money Quotient Don't forget
              to enjoy and learn ;)`}
              </li>
              <li className={styles.text}>
                {` Alright, let's see what your money quotient is. Good luck!`}
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.button} onClick={() => setstarted(true)}>
          Start
        </div>
      </div>
    </div>
  )
}