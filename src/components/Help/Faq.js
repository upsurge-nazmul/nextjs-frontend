import React, { useState } from "react";
import styles from "../../styles/Help/faq.module.scss";
import FaqClosedArrow from "../SVGcomponents/FaqClosedArrow";
import FaqOpenArrow from "../SVGcomponents/FaqOpenArrow";

function Faq({ question, answer }) {
  const [show, setshow] = useState(false);
  return (
    <div className={styles.faqcomponent}>
      <div
        className={`${styles.top} ${show ? styles.faqopened : ""}`}
        onClick={() => setshow(!show)}
      >
        <div className={styles.icon}>
          {!show ? <FaqClosedArrow /> : <FaqOpenArrow />}
        </div>
        <p className={styles.question}>{question}</p>
      </div>
      <div className={`${styles.answer} ${show ? styles.showanswer : ""}`}>
        {answer}
      </div>
    </div>
  );
}

export default Faq;
