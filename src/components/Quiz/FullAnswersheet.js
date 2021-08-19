import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/Quiz/fullAnswersheet.module.scss";

function FullAnswersheet({ openFull, setOpenFull, answersheet }) {
  return (
    <AnimatePresence>
      {openFull && (
        <div className={styles.fullAnswersheet}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "Tween", duration: 0.2 }}
            className={styles.back}
            onClick={() => setOpenFull(false)}
          ></motion.div>
          <motion.div
            initial={{ y: 400 }}
            animate={{ y: 0 }}
            exit={{ y: 400 }}
            transition={{ type: "Tween", duration: 0.2 }}
            className={styles.holder}
          >
            <div
              className={styles.cancelButton}
              onClick={() => {
                setOpenFull(false);
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="rgb(209, 68, 67)"
                width="40px"
                height="40px"
              >
                <path
                  fillRule="evenodd"
                  d="M17.999 4l-6.293 6.293L5.413 4 4 5.414l6.292 6.293L4 18l1.413 1.414 6.293-6.292 6.293 6.292L19.414 18l-6.294-6.293 6.294-6.293z"
                ></path>
              </svg>
            </div>
            {answersheet.map((item, index) => {
              return (
                <div
                  className={styles.resultholder}
                  key={"resultholder" + index}
                >
                  <div className={styles.question}>
                    Q. {index + 1 + " " + item.question}
                  </div>
                  <div className={`${styles.result + " " + item.result}`}>
                    {item.result}
                  </div>
                  {item.result === "wrong" ? (
                    <div className={styles.correctAns}>
                      {"Correct Answer" + " : " + item.correctAnswer}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default FullAnswersheet;
