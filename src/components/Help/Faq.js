import React, { useContext, useState } from "react";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Help/faq.module.scss";
import FaqClosedArrow from "../SVGcomponents/FaqClosedArrow";
import FaqOpenArrow from "../SVGcomponents/FaqOpenArrow";

function Faq({ question, answer, current, setcurrent }) {
  const { theme } = useContext(MainContext);

  return (
    <div
      className={`${styles.faqcomponent} ${
        theme === "dark" && styles.darkfaqcomponent
      }`}
    >
      <div
        className={`${styles.top} ${
          current === question ? styles.faqopened : ""
        }`}
        onClick={() => {
          if (current === question) {
            setcurrent("");
          } else {
            setcurrent(question);
          }
        }}
      >
        <div className={styles.icon}>
          {!(current === question) ? <FaqClosedArrow /> : <FaqOpenArrow />}
        </div>
        <p className={styles.question}>{question}</p>
      </div>
      <div
        className={`${styles.answer} ${
          current === question ? styles.showanswer : ""
        }`}
      >
        {answer}
      </div>
    </div>
  );
}

export default Faq;
