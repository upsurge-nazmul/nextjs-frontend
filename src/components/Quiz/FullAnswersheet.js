import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/Quiz/fullAnswerSheet.module.scss";
import RemoveSvg from "../SVGcomponents/RemoveSvg";

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
              <RemoveSvg clr="rgb(209, 68, 67)" />
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
